const { PrismaClient } = require('@prisma/client');
const statusCode = require('../../util/statusCode');
const { successFalse, successTrue } = require('../../util/response');
const responseMessage = require('../../util/responseMessage');
const { connect } = require('.');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(successTrue(statusCode.BAD_REQUEST, responseMessage.BLOG_REQUIRED));
        }
        if (!tags) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(successTrue(statusCode.BAD_REQUEST, responseMessage.BLOG_REQUIRED_TAG));
        }
        const tagConnections = await Promise.all(
            tags.map(async (tag) => {
                let existingTag = await prisma.tag.findUnique({
                    where: { name: tag },
                });
                if (!existingTag) {
                    await prisma.tag.create({
                        data: { name: tag },
                    });
                    return { id: existingTag.id };
                }

                return { id: existingTag.id };
            })
        );

        await prisma.blog.create({
            data: {
                title,
                content,
                tags: { connect: tagConnections },
            },
        });
        return res.status(statusCode.OK).send(statusCode.OK, responseMessage.BLOG_CREATE_SUCCESS);
    } catch (err) {
        console.error(err);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR));
    }
};

module.exports = create;
