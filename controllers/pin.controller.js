import Pin from "../models/pin.model.js";

export const getPins = async (req, res) => {

    const pageNumber = Number(req.query.cursor) || 0;
    const LIMIT = 21;
    const pins = await Pin.find()
        .limit(LIMIT)
        .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    res
        .status(200)
        .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
}