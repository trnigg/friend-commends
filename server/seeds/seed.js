const db = require("../config/connection");
const { User, Recommendation, Watch, Share } = require("../models");
const { ObjectId } = require("mongodb");
const userSeeds = require("./userSeeds.json");
const dataSeeds = require("./dataSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Recommendation", "recommendations");
    await cleanDB("Share", "shares");
    await cleanDB("Watch", "watches");
    await cleanDB("User", "users");

    await User.create(userSeeds);
    const rmovie1 = await Recommendation.create(dataSeeds[0]);
    const rmovie2 = await Recommendation.create(dataSeeds[1]);
    const rtv1 = await Recommendation.create(dataSeeds[2]);
    const rtv2 = await Recommendation.create(dataSeeds[3]);

    const wmovie1 = await Watch.create(dataSeeds[0]);
    const wmovie2 = await Watch.create(dataSeeds[1]);
    const wtv1 = await Watch.create(dataSeeds[2]);
    const wtv2 = await Watch.create(dataSeeds[3]);

    await User.findOneAndUpdate(
      { userName: "MattG" },
      { $addToSet: { recommendations: rmovie1 , watchList: wtv1 } },
      { new: true }
    );


    await User.findOneAndUpdate(
      { userName: "ElliotF" },
      { $addToSet: { recommendations: rmovie2 , watchList: wtv2 } },
      { new: true }
    );


    await User.findOneAndUpdate(
      { userName: "Demo" },
      { $addToSet: { recommendations: [rtv1,rtv2] , watchList: wmovie1} },
      { new: true }
    );


    await User.findOneAndUpdate(
      { userName: "BeeZee" },
      { $addToSet: { recommendations: rtv1} },
      { new: true }
    );

    const user1 = await User.findOne({userName:"MattG"})
    const user2 = await User.findOne({userName:"ElliotF"})
    const user3 = await User.findOne({userName:"JohnS"})
    const user4 = await User.findOne({userName:"Demo"})
    const user5 = await User.findOne({userName:"NewFriend"})

    await User.findByIdAndUpdate(
        user5._id,
        { $addToSet: { sentFriendRequests: user4} },
        { new: true }
      );
    await User.findByIdAndUpdate(
        user4._id,
        { $addToSet: { pendingFriendRequests: user5} },
        { new: true }
      );


    await User.findByIdAndUpdate(
        user1._id,
        { $addToSet: { friends: user4} },
        { new: true }
      );

    await User.findByIdAndUpdate(
        user2._id,
        { $addToSet: { friends: [user3,user4]} },
        { new: true }
      );

      await User.findByIdAndUpdate(
        user3._id,
        { $addToSet: { friends: [user2,user3]}, },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user4._id,
        { $addToSet: { friends: [user1,user2,user3]} },
        { new: true }
      );

    const smovie1 = {...dataSeeds[0] , sharedFrom:user1._id , sharedTo:user4._id , shareMessage: "Good Movie!"}
    //console.log("smovie1:",smovie1);
    const share1 = await Share.create(smovie1);
    await User.findByIdAndUpdate(
        user1._id,
        { $addToSet: { shareSent: share1 } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user4._id,
        { $addToSet: { shareReceived: share1 } },
        { new: true }
      );

    const smovie2 = {...dataSeeds[1] , sharedFrom:user2 , sharedTo:user4, shareMessage: "I recommend this!"}
    //console.log("smovie1:",smovie2);
    const share2 = await Share.create(smovie2);
    await User.findByIdAndUpdate(
        user2._id,
        { $addToSet: { shareSent: share2 } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user4._id,
        { $addToSet: { shareReceived: share2 } },
        { new: true }
      );


    const stv2 = {...dataSeeds[3] , sharedFrom:user3 , sharedTo:user4, shareMessage: "It's hilarious!"}
    const share3 =await Share.create(stv2);

    await User.findByIdAndUpdate(
        user3._id,
        { $addToSet: { shareSent: share3 } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user4._id,
        { $addToSet: { shareReceived: share3 } },
        { new: true }
      );

    const stv1 = {...dataSeeds[2] , sharedFrom:user3 , sharedTo:user2, shareMessage: "Great Show!"}
    const share4 =await Share.create(stv1);

    await User.findByIdAndUpdate(
        user3._id,
        { $addToSet: { shareSent: share4 } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user2._id,
        { $addToSet: { shareReceived: share4 } },
        { new: true }
      );

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});