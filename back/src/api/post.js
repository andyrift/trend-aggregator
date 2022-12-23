const googleTrends = require('google-trends-api');
const Post = require("../models/post");
const Favorite = require("../models/favorite");
const Comment = require("../models/comment");

const express = require("express");

const router = express.Router();

checkTrends = () => {
  console.log("Start checking trends");
  googleTrends.dailyTrends({ geo: 'US' }).then(res => JSON.parse(res)).then(async data => {
    for (trends of data.default.trendingSearchesDays.reverse()) {
      let date = trends.formattedDate;
      for (trend of trends.trendingSearches.reverse()) {
        let related = [];
        trend.relatedQueries.forEach(q => {
          related.push(q.query);
        })
        let post = new Post({ 
          date: date,
          query: trend.title.query,
          related: related,
          traffic: trend.formattedTraffic,
          image: trend.image.imageUrl,
          articleSource: trend.articles && trend.articles[0] ? trend.articles[0].source : null,
          articleTitle: trend.articles && trend.articles[0] ? trend.articles[0].title : null,
          articleUrl: trend.articles && trend.articles[0] ? trend.articles[0].url : null,
          articleImage: trend.articles && trend.articles[0] && trend.articles[0].image ? trend.articles[0].image.imageUrl : null,
          articleSnippet: trend.articles && trend.articles[0] ? trend.articles[0].snippet : null
        });
        let res = await Post.findOneAndUpdate({ "query": trend.title.query }, { 
          date: date,
          query: trend.title.query,
          related: related,
          traffic: trend.formattedTraffic,
          image: trend.image.imageUrl,
          articleSource: trend.articles && trend.articles[0] ? trend.articles[0].source : null,
          articleTitle: trend.articles && trend.articles[0] ? trend.articles[0].title : null,
          articleUrl: trend.articles && trend.articles[0] ? trend.articles[0].url : null,
          articleImage: trend.articles && trend.articles[0] && trend.articles[0].image ? trend.articles[0].image.imageUrl : null,
          articleSnippet: trend.articles && trend.articles[0] ? trend.articles[0].snippet : null
        }, { new: true, upsert: true, rawResult: true }).exec();
        if(res.lastErrorObject.updatedExisting) {
          console.log("Updated: ", post.query);
        }
      }
    }
    console.log("Done checking trends");
  }).catch(err => {
    console.error(err);
  });
}

setInterval(checkTrends, 1000 * 60 * 60 );

router.get('/save', (req, res) => {
  if(req.user && req.user._id == 109002956634604810000) {
    checkTrends();
  }
  res.status(200).send();
})

router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(async post => {
    fav = req.user ? await Favorite.findOne({ "user_id": req.user._id, post_id: post._id }, {}).exec() : false;
    post = post.toObject();
    post.favorite = !!fav;
    res.status(200).json({ result: post });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: "error" });
  });
});

router.get('/post/', (req, res) => {
  const skip = req.query.skip || 0;
  Post
    .find({}, {})
    .sort({ "createdAt": -1, "_id": 1 })
    .skip(parseInt(skip))
    .limit(10)
    .then(async posts => {
      let result = [];
      for(post of posts) {
        fav = req.user ? await Favorite.findOne({ "user_id": req.user._id, post_id: post._id }, {}).exec() : false;
        post = post.toObject();
        post.favorite = !!fav;
        result.push(post);
      }
      
      res.status(200).json({ result })
    }).catch(err => {
      res.status(500).json({ result: [] })
    })
});

router.put('/favorite/', (req, res) => {
  if (req.user) {
    Favorite.findOneAndDelete({"user_id": req.user._id, "post_id": req.body.id }).then(() => {
      if(req.body.favorite) {
        const favorite = new Favorite(
          {"user_id": req.user._id, "post_id": req.body.id }
        )
        favorite.save().then(() => {
          res.status(200).json(200);
        })
      }
    })
    
  } else {
    res.status(200).json({});
  }
});

router.get('/favorites/', (req, res) => {
  if (req.user) {
    const skip = req.query.skip || 0;
    const quantity = req.query.quantity || 10;
    Favorite
      .find({ "user_id": req.user._id }, {})
      .sort({ "createdAt": -1, "_id": 1 })
      .skip(skip)
      .limit(quantity)
      .then(async favorites => {
        let posts = [];
        for(fav of favorites) {
          let post = await Post.findOne({ _id: fav.post_id }).exec();
          post = post.toObject();
          post.favorite = true;
          posts.push(post);
        }
        res.status(200).json({ result: posts })
      }).catch(err => {
        res.status(500).json({ result: [] })
      })
  } else {
    res.status(200).json({});
  }
});

router.get('/recent/', (req, res) => {
  if (req.user) {
    const quantity = req.query.quantity || 6;
    Comment
      .aggregate(
        [
          {
            $match: {
              "user_id": req.user._id
            }
          },
          {
            $sort: {
              "createdAt": -1
            }
          },
          {
            $group: { _id: "$post_id", createdAt: { "$first": "$createdAt" }}
          },
          {
            $sort: {
              "createdAt": -1
            }
          },
          { $limit : parseInt(quantity) },
        ]
      ).then(async comments => {
        let posts = [];
        for(com of comments) {
          let post = await Post.findOne({ _id: com._id }).exec();
          let fav = await Favorite.findOne({"user_id": req.user._id, "post_id": post._id }).exec();
          post = post.toObject();
          post.favorite = !!fav;
          posts.push(post);
        }
        res.status(200).json({ result: posts })
      }).catch(err => {
        console.log(err);
        res.status(500).json({ result: [] })
      })
  } else {
    res.status(200).json({});
  }
});

router.get('/popular/', (req, res) => {
  const quantity = req.query.quantity || 6;
  Comment
    .aggregate(
      [
        { $sortByCount:  "$post_id" },
        { $limit : parseInt(quantity) },
      ]
    ).then(async ids => {
      let posts = [];
      for(id of ids) {
        let post = await Post.findOne({ _id: id._id }).exec();
        post = post.toObject();
        posts.push(post);
      }
      res.status(200).json({ result: posts })
    }).catch(err => {
      console.log(err);
      res.status(500).json({ result: [] })
    })
});

module.exports = router;