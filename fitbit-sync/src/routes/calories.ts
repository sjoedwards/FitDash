import { FitbitData, FitbitCaloriesData } from "./../../types";
import { Context } from "koa";
import axios from "axios";
import moment from "moment";
import Router from "@koa/router";
import ObjectsToCsv from "objects-to-csv";
import { cache } from "../cache";

const caloriesRouter = new Router();

const getCalories = async (
  ctx: Context,
  weeksAgo: number
): Promise<FitbitCaloriesData> => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`,
  };
  const weekStart = moment()
    .subtract(weeksAgo, "weeks")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");
  const weekEnd = moment()
    .subtract(weeksAgo, "weeks")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");

  const caloriesLog: Array<FitbitData> = (
    await axios({
      url: `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/${weekStart}/${weekEnd}.json`,
      method: "get",
      headers,
    })
  ).data["foods-log-caloriesIn"].filter(({ value }: FitbitData) => value !== 0);

  const calories = (
    caloriesLog.reduce(
      (sum: number, { value }) => sum + parseInt(`${value}`, 10),
      0
    ) / caloriesLog.length
  ).toFixed(0);

  const activityCaloriesLog = await axios({
    url: `https://api.fitbit.com/1/user/-/activities/calories/date/${weekStart}/${weekEnd}.json`,
    method: "get",
    headers,
  });

  const activityCaloriesLogData =
    activityCaloriesLog &&
    activityCaloriesLog.data["activities-calories"].filter(
      ({ value }: FitbitData) => value !== 0
    );

  const activityCalories = (
    activityCaloriesLogData.reduce(
      (sum: number, { value }: FitbitData) => sum + parseInt(`${value}`, 10),
      0
    ) / activityCaloriesLogData.length
  ).toFixed(0);

  return { weekEnd, calories, activityCalories };
};

caloriesRouter.get("/calories", async (ctx: Context) => {
  const cachedCalories: Array<FitbitCaloriesData> = cache.get("calories");
  let calories;
  if (cachedCalories) {
    /* eslint-disable-next-line no-console */
    console.log("Retrieving calories from cache");
    calories = cachedCalories;
  } else {
    /* eslint-disable-next-line no-console */
    console.log("Getting calories from fitbit");
    calories = (
      await Promise.all(
        Array(6)
          .fill(undefined)
          .map(async (_, index) => {
            const weeksAgo = index + 1;
            return getCalories(ctx, weeksAgo);
          })
      )
    ).sort((a, b) => {
      if (a.weekEnd === b.weekEnd) {
        return 0;
      }
      return a.weekEnd > b.weekEnd ? 1 : -1;
    });
    cache.set("calories", calories);
  }
  const csv = new ObjectsToCsv(calories);
  await csv.toDisk(`./results/calories/${moment().format("YYYY-MM-DD")}.csv`);
  ctx.body = await csv.toString();
});

export { caloriesRouter };