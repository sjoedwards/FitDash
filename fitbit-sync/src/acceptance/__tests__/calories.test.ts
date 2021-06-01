import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import { app } from "../../app";

let realDateNow: () => number;
beforeEach(() => {
  realDateNow = Date.now.bind(global.Date);
  // stub date to 2021-05-29, 12:00:00
  global.Date.now = jest.fn().mockReturnValue(1622289600000);
});

afterEach(() => {
  global.Date.now = realDateNow;
});

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const mockCalories = [
  {
    weekStart: "2021-04-12",
    weekEnd: "2021-04-18",
    "foods-log-caloriesIn": [
      { dateTime: "2021-04-12", value: "1572" },
      { dateTime: "2021-04-13", value: "1411" },
      { dateTime: "2021-04-14", value: "1621" },
      { dateTime: "2021-04-15", value: "2740" },
      { dateTime: "2021-04-16", value: "4580" },
      { dateTime: "2021-04-17", value: "3222" },
      { dateTime: "2021-04-18", value: "2207" },
    ],
    "activities-calories": [
      { dateTime: "2021-04-12", value: "2439" },
      { dateTime: "2021-04-13", value: "3454" },
      { dateTime: "2021-04-14", value: "2700" },
      { dateTime: "2021-04-15", value: "3005" },
      { dateTime: "2021-04-16", value: "3040" },
      { dateTime: "2021-04-17", value: "4012" },
      { dateTime: "2021-04-18", value: "5191" },
    ],
  },
  {
    weekStart: "2021-04-19",
    weekEnd: "2021-04-25",
    "foods-log-caloriesIn": [
      { dateTime: "2021-04-19", value: "1591" },
      { dateTime: "2021-04-20", value: "3307" },
      { dateTime: "2021-04-21", value: "3366" },
      { dateTime: "2021-04-22", value: "3018" },
      { dateTime: "2021-04-23", value: "3573" },
      { dateTime: "2021-04-24", value: "4304" },
      { dateTime: "2021-04-25", value: "2631" },
    ],
    "activities-calories": [
      { dateTime: "2021-04-19", value: "2393" },
      { dateTime: "2021-04-20", value: "2902" },
      { dateTime: "2021-04-21", value: "3973" },
      { dateTime: "2021-04-22", value: "3101" },
      { dateTime: "2021-04-23", value: "3691" },
      { dateTime: "2021-04-24", value: "5472" },
      { dateTime: "2021-04-25", value: "2936" },
    ],
  },
  {
    weekStart: "2021-04-26",
    weekEnd: "2021-05-02",
    "foods-log-caloriesIn": [
      { dateTime: "2021-04-26", value: "1372" },
      { dateTime: "2021-04-27", value: "1443" },
      { dateTime: "2021-04-28", value: "1746" },
      { dateTime: "2021-04-29", value: "1927" },
      { dateTime: "2021-04-30", value: "3540" },
      { dateTime: "2021-05-01", value: "5082" },
      { dateTime: "2021-05-02", value: "3085" },
    ],
    "activities-calories": [
      { dateTime: "2021-04-26", value: "3564" },
      { dateTime: "2021-04-27", value: "3597" },
      { dateTime: "2021-04-28", value: "3137" },
      { dateTime: "2021-04-29", value: "3640" },
      { dateTime: "2021-04-30", value: "2549" },
      { dateTime: "2021-05-01", value: "4972" },
      { dateTime: "2021-05-02", value: "3090" },
    ],
  },
  {
    weekStart: "2021-05-03",
    weekEnd: "2021-05-09",
    "foods-log-caloriesIn": [
      { dateTime: "2021-05-03", value: "3121" },
      { dateTime: "2021-05-04", value: "1535" },
      { dateTime: "2021-05-05", value: "1506" },
      { dateTime: "2021-05-06", value: "2684" },
      { dateTime: "2021-05-07", value: "4088" },
      { dateTime: "2021-05-08", value: "4790" },
      { dateTime: "2021-05-09", value: "4872" },
    ],
    "activities-calories": [
      { dateTime: "2021-05-03", value: "2650" },
      { dateTime: "2021-05-04", value: "3645" },
      { dateTime: "2021-05-05", value: "2613" },
      { dateTime: "2021-05-06", value: "2836" },
      { dateTime: "2021-05-07", value: "2711" },
      { dateTime: "2021-05-08", value: "3363" },
      { dateTime: "2021-05-09", value: "5193" },
    ],
  },
  {
    weekStart: "2021-05-10",
    weekEnd: "2021-05-16",
    "foods-log-caloriesIn": [
      { dateTime: "2021-05-10", value: "3638" },
      { dateTime: "2021-05-11", value: "1352" },
      { dateTime: "2021-05-12", value: "1981" },
      { dateTime: "2021-05-13", value: "1526" },
      { dateTime: "2021-05-14", value: "3791" },
      { dateTime: "2021-05-15", value: "4019" },
      { dateTime: "2021-05-16", value: "1758" },
    ],
    "activities-calories": [
      { dateTime: "2021-05-10", value: "2705" },
      { dateTime: "2021-05-11", value: "2793" },
      { dateTime: "2021-05-12", value: "3674" },
      { dateTime: "2021-05-13", value: "3492" },
      { dateTime: "2021-05-14", value: "2837" },
      { dateTime: "2021-05-15", value: "4669" },
      { dateTime: "2021-05-16", value: "4316" },
    ],
  },
  {
    weekStart: "2021-05-17",
    weekEnd: "2021-05-23",
    "foods-log-caloriesIn": [
      { dateTime: "2021-05-17", value: "1327" },
      { dateTime: "2021-05-18", value: "1441" },
      { dateTime: "2021-05-19", value: "1441" },
      { dateTime: "2021-05-20", value: "2214" },
      { dateTime: "2021-05-21", value: "2746" },
      { dateTime: "2021-05-22", value: "3718" },
      { dateTime: "2021-05-23", value: "2420" },
    ],
    "activities-calories": [
      { dateTime: "2021-05-17", value: "2928" },
      { dateTime: "2021-05-18", value: "3684" },
      { dateTime: "2021-05-19", value: "4181" },
      { dateTime: "2021-05-20", value: "2577" },
      { dateTime: "2021-05-21", value: "2775" },
      { dateTime: "2021-05-22", value: "4270" },
      { dateTime: "2021-05-23", value: "5169" },
    ],
  },
];

const mockMonthly = {
  "foods-log-caloriesIn": [
    { dateTime: "2021-02-26", value: "3464" },
    { dateTime: "2021-02-27", value: "3686" },
    { dateTime: "2021-02-28", value: "2442" },
    { dateTime: "2021-03-01", value: "1311" },
    { dateTime: "2021-03-02", value: "1558" },
    { dateTime: "2021-03-03", value: "1507" },
    { dateTime: "2021-03-04", value: "2204" },
    { dateTime: "2021-03-05", value: "3152" },
    { dateTime: "2021-03-06", value: "3989" },
    { dateTime: "2021-03-07", value: "2734" },
    { dateTime: "2021-03-08", value: "1387" },
    { dateTime: "2021-03-09", value: "1445" },
    { dateTime: "2021-03-10", value: "1404" },
    { dateTime: "2021-03-11", value: "2064" },
    { dateTime: "2021-03-12", value: "2691" },
    { dateTime: "2021-03-13", value: "5081" },
    { dateTime: "2021-03-14", value: "1529" },
    { dateTime: "2021-03-15", value: "1253" },
    { dateTime: "2021-03-16", value: "1562" },
    { dateTime: "2021-03-17", value: "1638" },
    { dateTime: "2021-03-18", value: "1817" },
    { dateTime: "2021-03-19", value: "3845" },
    { dateTime: "2021-03-20", value: "4626" },
    { dateTime: "2021-03-21", value: "1915" },
    { dateTime: "2021-03-22", value: "1522" },
    { dateTime: "2021-03-23", value: "1645" },
    { dateTime: "2021-03-24", value: "2208" },
    { dateTime: "2021-03-25", value: "2246" },
    { dateTime: "2021-03-26", value: "3435" },
    { dateTime: "2021-03-27", value: "3387" },
    { dateTime: "2021-03-28", value: "1760" },
    { dateTime: "2021-03-29", value: "1563" },
    { dateTime: "2021-03-30", value: "1312" },
    { dateTime: "2021-03-31", value: "1926" },
    { dateTime: "2021-04-01", value: "2924" },
    { dateTime: "2021-04-02", value: "2879" },
    { dateTime: "2021-04-03", value: "2394" },
    { dateTime: "2021-04-04", value: "3131" },
    { dateTime: "2021-04-05", value: "2861" },
    { dateTime: "2021-04-06", value: "1539" },
    { dateTime: "2021-04-07", value: "1337" },
    { dateTime: "2021-04-08", value: "1718" },
    { dateTime: "2021-04-09", value: "3603" },
    { dateTime: "2021-04-10", value: "4542" },
    { dateTime: "2021-04-11", value: "2446" },
    { dateTime: "2021-04-12", value: "1572" },
    { dateTime: "2021-04-13", value: "1411" },
    { dateTime: "2021-04-14", value: "1621" },
    { dateTime: "2021-04-15", value: "2740" },
    { dateTime: "2021-04-16", value: "4580" },
    { dateTime: "2021-04-17", value: "3222" },
    { dateTime: "2021-04-18", value: "2207" },
    { dateTime: "2021-04-19", value: "1591" },
    { dateTime: "2021-04-20", value: "3307" },
    { dateTime: "2021-04-21", value: "3366" },
    { dateTime: "2021-04-22", value: "3018" },
    { dateTime: "2021-04-23", value: "3573" },
    { dateTime: "2021-04-24", value: "4304" },
    { dateTime: "2021-04-25", value: "2631" },
    { dateTime: "2021-04-26", value: "1372" },
    { dateTime: "2021-04-27", value: "1443" },
    { dateTime: "2021-04-28", value: "1746" },
    { dateTime: "2021-04-29", value: "1927" },
    { dateTime: "2021-04-30", value: "3540" },
    { dateTime: "2021-05-01", value: "5082" },
    { dateTime: "2021-05-02", value: "3085" },
    { dateTime: "2021-05-03", value: "3121" },
    { dateTime: "2021-05-04", value: "1535" },
    { dateTime: "2021-05-05", value: "1506" },
    { dateTime: "2021-05-06", value: "2684" },
    { dateTime: "2021-05-07", value: "4088" },
    { dateTime: "2021-05-08", value: "4790" },
    { dateTime: "2021-05-09", value: "4872" },
    { dateTime: "2021-05-10", value: "3638" },
    { dateTime: "2021-05-11", value: "1352" },
    { dateTime: "2021-05-12", value: "1981" },
    { dateTime: "2021-05-13", value: "1526" },
    { dateTime: "2021-05-14", value: "3791" },
    { dateTime: "2021-05-15", value: "4019" },
    { dateTime: "2021-05-16", value: "1758" },
    { dateTime: "2021-05-17", value: "1327" },
    { dateTime: "2021-05-18", value: "1441" },
    { dateTime: "2021-05-19", value: "1441" },
    { dateTime: "2021-05-20", value: "2214" },
    { dateTime: "2021-05-21", value: "2746" },
    { dateTime: "2021-05-22", value: "3718" },
    { dateTime: "2021-05-23", value: "2420" },
    { dateTime: "2021-05-24", value: "3025" },
    { dateTime: "2021-05-25", value: "2880" },
    { dateTime: "2021-05-26", value: "4769" },
    { dateTime: "2021-05-27", value: "1666" },
    { dateTime: "2021-05-28", value: "3816" },
    { dateTime: "2021-05-29", value: "3980" },
  ],
  "activities-calories": [
    { dateTime: "2021-02-26", value: "2963" },
    { dateTime: "2021-02-27", value: "4634" },
    { dateTime: "2021-02-28", value: "3334" },
    { dateTime: "2021-03-01", value: "3045" },
    { dateTime: "2021-03-02", value: "3151" },
    { dateTime: "2021-03-03", value: "3102" },
    { dateTime: "2021-03-04", value: "3603" },
    { dateTime: "2021-03-05", value: "2054" },
    { dateTime: "2021-03-06", value: "5099" },
    { dateTime: "2021-03-07", value: "3095" },
    { dateTime: "2021-03-08", value: "2979" },
    { dateTime: "2021-03-09", value: "3212" },
    { dateTime: "2021-03-10", value: "2622" },
    { dateTime: "2021-03-11", value: "3617" },
    { dateTime: "2021-03-12", value: "2325" },
    { dateTime: "2021-03-13", value: "5086" },
    { dateTime: "2021-03-14", value: "2953" },
    { dateTime: "2021-03-15", value: "2448" },
    { dateTime: "2021-03-16", value: "2578" },
    { dateTime: "2021-03-17", value: "2744" },
    { dateTime: "2021-03-18", value: "3665" },
    { dateTime: "2021-03-19", value: "2623" },
    { dateTime: "2021-03-20", value: "4617" },
    { dateTime: "2021-03-21", value: "2300" },
    { dateTime: "2021-03-22", value: "3000" },
    { dateTime: "2021-03-23", value: "2634" },
    { dateTime: "2021-03-24", value: "3569" },
    { dateTime: "2021-03-25", value: "2631" },
    { dateTime: "2021-03-26", value: "4338" },
    { dateTime: "2021-03-27", value: "4777" },
    { dateTime: "2021-03-28", value: "3266" },
    { dateTime: "2021-03-29", value: "3168" },
    { dateTime: "2021-03-30", value: "3755" },
    { dateTime: "2021-03-31", value: "3383" },
    { dateTime: "2021-04-01", value: "2780" },
    { dateTime: "2021-04-02", value: "2828" },
    { dateTime: "2021-04-03", value: "3189" },
    { dateTime: "2021-04-04", value: "4395" },
    { dateTime: "2021-04-05", value: "3527" },
    { dateTime: "2021-04-06", value: "3092" },
    { dateTime: "2021-04-07", value: "2557" },
    { dateTime: "2021-04-08", value: "3118" },
    { dateTime: "2021-04-09", value: "2742" },
    { dateTime: "2021-04-10", value: "5404" },
    { dateTime: "2021-04-11", value: "3769" },
    { dateTime: "2021-04-12", value: "2439" },
    { dateTime: "2021-04-13", value: "3454" },
    { dateTime: "2021-04-14", value: "2700" },
    { dateTime: "2021-04-15", value: "3005" },
    { dateTime: "2021-04-16", value: "3040" },
    { dateTime: "2021-04-17", value: "4012" },
    { dateTime: "2021-04-18", value: "5191" },
    { dateTime: "2021-04-19", value: "2393" },
    { dateTime: "2021-04-20", value: "2902" },
    { dateTime: "2021-04-21", value: "3973" },
    { dateTime: "2021-04-22", value: "3101" },
    { dateTime: "2021-04-23", value: "3691" },
    { dateTime: "2021-04-24", value: "5472" },
    { dateTime: "2021-04-25", value: "2936" },
    { dateTime: "2021-04-26", value: "3564" },
    { dateTime: "2021-04-27", value: "3597" },
    { dateTime: "2021-04-28", value: "3137" },
    { dateTime: "2021-04-29", value: "3640" },
    { dateTime: "2021-04-30", value: "2549" },
    { dateTime: "2021-05-01", value: "4972" },
    { dateTime: "2021-05-02", value: "3090" },
    { dateTime: "2021-05-03", value: "2650" },
    { dateTime: "2021-05-04", value: "3645" },
    { dateTime: "2021-05-05", value: "2613" },
    { dateTime: "2021-05-06", value: "2836" },
    { dateTime: "2021-05-07", value: "2711" },
    { dateTime: "2021-05-08", value: "3363" },
    { dateTime: "2021-05-09", value: "5193" },
    { dateTime: "2021-05-10", value: "2705" },
    { dateTime: "2021-05-11", value: "2793" },
    { dateTime: "2021-05-12", value: "3674" },
    { dateTime: "2021-05-13", value: "3492" },
    { dateTime: "2021-05-14", value: "2837" },
    { dateTime: "2021-05-15", value: "4669" },
    { dateTime: "2021-05-16", value: "4316" },
    { dateTime: "2021-05-17", value: "2928" },
    { dateTime: "2021-05-18", value: "3684" },
    { dateTime: "2021-05-19", value: "4181" },
    { dateTime: "2021-05-20", value: "2577" },
    { dateTime: "2021-05-21", value: "2775" },
    { dateTime: "2021-05-22", value: "4270" },
    { dateTime: "2021-05-23", value: "5169" },
    { dateTime: "2021-05-24", value: "3131" },
    { dateTime: "2021-05-25", value: "3157" },
    { dateTime: "2021-05-26", value: "3411" },
    { dateTime: "2021-05-27", value: "3815" },
    { dateTime: "2021-05-28", value: "3356" },
    { dateTime: "2021-05-29", value: "4157" },
  ],
};
describe("Calories Route", () => {
  it("should return the correct calorie information", async () => {
    // mockCalories.forEach((week) => {
    //   const urlCalsIn = new RegExp(
    //     `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/${week.weekStart}/${week.weekEnd}.json`
    //   );

    //   const urlActivitiesCals = new RegExp(
    //     `https://api.fitbit.com/1/user/-/activities/calories/date/${week.weekStart}/${week.weekEnd}.json`
    //   );
    //   mock
    //     .onGet(urlCalsIn)
    //     .reply(200, { "foods-log-caloriesIn": week["foods-log-caloriesIn"] });
    //   mock
    //     .onGet(urlActivitiesCals)
    //     .reply(200, { "activities-calories": week["activities-calories"] });
    // });
    const urlCalsInMonthly = new RegExp(
      "https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/today/3m.json"
    );
    const urlActivitiesCalsMonthly = new RegExp(
      "https://api.fitbit.com/1/user/-/activities/calories/date/today/3m.json"
    );
    mock.onGet(urlCalsInMonthly).reply(200, {
      "foods-log-caloriesIn": mockMonthly["foods-log-caloriesIn"],
    });
    mock.onGet(urlActivitiesCalsMonthly).reply(200, {
      "activities-calories": mockMonthly["activities-calories"],
    });

    const fitbitApiCalories = new RegExp(
      "https://api.fitbit.com/1/user/-/foods/log/caloriesIn/"
    );
    const fitbitApiActivities = new RegExp(
      "https://api.fitbit.com/1/user/-/activities/"
    );
    mock.onGet(fitbitApiCalories).reply(500);
    mock.onGet(fitbitApiActivities).reply(500);
    const response = await request(app.callback())
      .get("/calories")
      .set("Cookie", "accessToken=123")
      .send()
      .expect(200);
    expect(response.body).toEqual([
      { weekEnd: "2021-04-18", calories: "2479", activityCalories: "3406" },
      { weekEnd: "2021-04-25", calories: "3113", activityCalories: "3495" },
      { weekEnd: "2021-05-02", calories: "2599", activityCalories: "3507" },
      { weekEnd: "2021-05-09", calories: "3228", activityCalories: "3287" },
      { weekEnd: "2021-05-16", calories: "2581", activityCalories: "3498" },
      { weekEnd: "2021-05-23", calories: "2187", activityCalories: "3655" },
    ]);
  });
});
