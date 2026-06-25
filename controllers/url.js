const {nanoid} = require("nanoid");
const URL = require("../models/url");
const QRCode = require("qrcode");

async function handleGenerateShortUrl(req, res) {

    const shortId = nanoid(8);

    await URL.create({
        shortId,
        originalURL: req.body.url,
        visitHistory: [],
        createdBY: req.user._id
    });

    // Short URL banao
    const shortURL = `http://localhost:8001/${shortId}`;

    // QR Code Generate karo
    const qrCode = await QRCode.toDataURL(shortURL);

    const allUrls = await URL.find({
        createdBY: req.user._id
    });

    return res.render("home", {
        id: shortId,
        qrCode,
        urls: allUrls
    });
}


async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId: shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
};
