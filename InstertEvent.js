const mongoose = require("mongoose");
const Event = require("./models/Event");

const eventsList = [
  {
    imgID: "algorithm.jpeg",
    name: "ALGORITHM ROULETTE",
    date: "20/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "code.jpeg",
    name: "CODE RESURRECT",
    date: "20/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "hunt.jpeg",
    name: "HACK HUNT",
    date: "20/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "squid1.jpeg",
    name: "SQUID HUNT",
    date: "21/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "lan.jpeg",
    name: "LAN PARTY",
    date: "21/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "line.jpeg",
    name: "FASTEST LINE FOLLOWER",
    date: "20/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "robo.jpeg",
    name: "ROBO SOCCER",
    date: "21/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "plane.jpeg",
    name: "WRIGHT BROTHERS",
    date: "21/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "elect.jpeg",
    name: "ELECTRO DETECTIVES",
    date: "20/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "route.jpeg",
    name: "ROUTE RUSH",
    date: "21/03/2025",
    time: "10:00 am",
    type: "technical",
  },
  {
    imgID: "1.jpeg",
    name: "SHRITHI SAMRAT",
    date: "20/03/2025",
    time: "10:00 am",
    type: "cultural",
  },
  {
    imgID: "2.png",
    name: "RAAG RUMBLE",
    date: "20/03/2025",
    time: "11:00 am",
    type: "cultural",
  },
  {
    imgID: "3.jpeg",
    name: "THANDAV TAAL",
    date: "21/03/2025",
    time: "9:00 am",
    type: "cultural",
  },
  {
    imgID: "4.jpeg",
    name: "GROOVE GALA",
    date: "21/03/2025",
    time: "10:00 am",
    type: "cultural",
  },
  {
    imgID: "5.jpeg",
    name: "SPEECH OF SMILES",
    date: "20/03/2025",
    time: "10:00 am",
    type: "cultural",
  },
  {
    imgID: "6.jpeg",
    name: "SILENT SYMPHONY",
    date: "21/03/2025",
    time: "12:00 pm",
    type: "cultural",
  },
  {
    imgID: "7.jpeg",
    name: "WHO AM I?",
    date: "21/03/2025",
    time: "10:00 am",
    type: "cultural",
  },
  {
    imgID: "8.jpeg",
    name: "AAKRITHI",
    date: "21/03/2025",
    time: "11:00 am",
    type: "cultural",
  },
  {
    imgID: "9.jpeg",
    name: "NATURE'S PALETTE",
    date: "21/03/2025",
    time: "9:00 am",
    type: "cultural",
  },
  {
    imgID: "10.jpeg",
    name: "HASTHAKALA",
    date: "21/03/2025",
    time: "1:00 pm",
    type: "cultural",
  },
  {
    imgID: "11.jpeg",
    name: "MELODY CHAIN",
    date: "20/03/2025",
    time: "11:00 am",
    type: "cultural",
  },
  {
    imgID: "12.jpeg",
    name: "REEL-O-MANIA",
    date: "20/03/2025 and 21/03/2025",
    time: "9:00 am",
    type: "cultural",
  },
  {
    imgID: "13.jpeg",
    name: "FOCUS TO PRIZE",
    date: "20/03/2025 and 21/03/2025",
    time: "9:00 am",
    type: "cultural",
  },
  {
    imgID: "14.jpeg",
    name: "KALA SANGAMA",
    date: "21/03/2025",
    time: "1:15 pm",
    type: "cultural",
  },
  {
    imgID: "15.jpeg",
    name: "SHADES N STROKES",
    date: "21/03/2025",
    time: "12:00 pm",
    type: "cultural",
  },
  {
    imgID: "16.jpeg",
    name: "EXPRESSION SPEAKS",
    date: "21/03/2025",
    time: "11:00 am",
    type: "cultural",
  },
  {
    imgID: "17.jpeg",
    name: "STRATEGIC STOXX",
    date: "20/03/2025",
    time: "10:00 am",
    type: "business",
  },
  {
    imgID: "18.jpeg",
    name: "VISIONARY VENTURES",
    date: "20/03/2025",
    time: "10:00 am",
    type: "business",
  },
  {
    imgID: "19.jpeg",
    name: "THE ULTIMATE BIZ TEAM",
    date: "20/03/2025",
    time: "10:00 am",
    type: "business",
  },
];

const insertEvent = async () => {
  try {
    await Event.insertMany(eventsList);
    console.log("Events inserted successfully");
  } catch (error) {
    console.error("Error inserting events:", error);
  }
};

module.exports = insertEvent;
