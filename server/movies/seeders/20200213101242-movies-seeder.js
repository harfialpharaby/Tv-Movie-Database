"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Movies",
      [
        {
          id: uuidv4(),
          title: "Kimetsu no Yaiba: Infinity Train",
          overview:
            "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
          posterPath:
            "https://cdn.myanimelist.net/images/anime/1238/103624l.jpg",
          popularity: 173.972,
          tags: ["action", "demon", "adventure"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: "Sen to Chihiro no Kamikakushi",
          overview:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis veniam cupiditate ad veritatis fugit est impedit quod cum? Blanditiis ab neque perferendis quaerat delectus ullam illo nisi, rem enim dicta optio assumenda. Temporibus, odit earum. Quod sunt totam nemo saepe ea quidem sapiente, harum amet perferendis deleniti earum illo a nihil odio? Quaerat sunt numquam aperiam eos iste dolorem odit odio quo maiores! Sunt architecto nemo illum unde laborum, eaque aut, nesciunt libero blanditiis, magnam magni delectus? Dolorum quisquam nam possimus voluptatibus! Ex ratione exercitationem itaque harum eligendi soluta, dolorem quisquam possimus, beatae, distinctio asperiores dicta. Quod minus dignissimos doloribus esse neque nesciunt quas quia, doloremque nihil suscipit rem iusto vero atque at dolorum iste quae nostrum placeat quidem itaque fugiat, amet repudiandae. Quibusdam suscipit enim provident nisi ab dicta qui, similique aspernatur nemo eligendi. Illum voluptates cumque perspiciatis inventore rem, sequi obcaecati excepturi perferendis aperiam voluptate necessitatibus tenetur nihil!",
          posterPath: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
          popularity: 273.881,
          tags: ["adventure", "fantasy", "horror", "animation"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Movies", null, {});
  }
};
