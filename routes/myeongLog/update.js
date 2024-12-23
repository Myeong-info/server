const { PrismaClient } = require('@prisma/client');
const statusCode = require('../../util/statusCode');
const { successTrue, successFalse } = require('../../util/response');
const responseMessage = require('../../util/responseMessage');
const prisma = new PrismaClient();

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await prisma.blog.update({
            where: { id: parseInt(id) },
            data: { title, content },
        });
        return res.status(statusCode.OK).send(successTrue(statusCode.OK, responseMessage.BLOG_UPDATE_SUCCESS));
    } catch (err) {
        console.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR));
    }
};

module.exports = update;
