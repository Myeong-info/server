const { PrismaClient } = require('@prisma/client');
const { successFalse, successTrue } = require('../../util/response');
const responseMessage = require('../../util/responseMessage');
const statusCode = require('../../util/statusCode');
const prisma = new PrismaClient();

const fire = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.blog.delete({
            where: { id: parseInt(id) },
        });
        return res.status(statusCode.OK).send(successTrue(statusCode.OK, responseMessage.BLOG_DELETE_SUCCESS));
    } catch (err) {
        console.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR));
    }
};

module.exports = fire;
