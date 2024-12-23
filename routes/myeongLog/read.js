const { PrismaClient } = require('@prisma/client');
const { successFalse, successTrue } = require('../../util/response');
const responseMessage = require('../../util/responseMessage');
const statusCode = require('../../util/statusCode');

const prisma = new PrismaClient();

const get = async (req, res) => {
    try {
        const { id } = req.param;
        const blog = await prisma.blog.findFirst({
            where: { id },
        });
        const viewUpdate = await prisma.blog.update({
            where: { id: blog.id },
            data: { views: blog.views + 1 },
        });
        if (!blog) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(successTrue(statusCode.NOT_FOUND, responseMessage.NOT_FOUND_BLOG));
        }
        return res.status(statusCode.OK).send(successTrue(statusCode.OK, responseMessage.BLOG_GET_SUCCESS, viewUpdate));
    } catch (err) {
        console.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR));
    }
};

const getAll = async (req, res) => {
    try {
        const { tagName } = req.query;
        const blog = await prisma.blog.findMany({
            where: tagName
                ? {
                      tags: { some: { name: tagName } },
                  }
                : {},
            include: { tags: true },
        });
        return res.status(statusCode.OK).send(successTrue(statusCode.OK, responseMessage.BLOG_GET_SUCCESS, blog));
    } catch (err) {
        console.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR));
    }
};

module.exports = { get, getAll };
