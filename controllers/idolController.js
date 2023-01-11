const { Idol, Branch } = require('../models')
const axios = require('axios');
const { Op } = require('sequelize');

class IdolController {
    static async showIdol(req, res, next) {
        const { filter } = req.query;
        const paramQuerySQL = {
            include: [
                {
                    model: Branch,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            order: [['id', 'asc']]
        };

        // filtering by category
        if (filter !== '' && typeof filter !== 'undefined') {
            const query = filter.branch.split(',').map((item) => ({
                [Op.eq]: item,
            }));

            paramQuerySQL.where = {
                BranchId: { [Op.or]: query },
            };
        }
        try {
            let data = await Idol.findAll(paramQuerySQL)
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async showBranches(req, res, next) {
        try {
            let data = await Branch.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static idolSong(req, res, next) {
        let id = req.params.id
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artist_singles/',
            params: { id, offset: '0', limit: '20' },
            headers: {
                'X-RapidAPI-Key': '37f62bd33cmshc44f509dac943b4p140114jsn4a30c69863c7',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(function (response) {
                let songs = response.data.data.artist.discography.singles.items
                res.status(200).json(songs);
            }).catch(function (error) {
                console.error(error);
            });
    }
    static idolYoutube(req, res, next) {
        let youtubeId = req.params.youtubeId
        const options = {
            method: 'GET',
            url: 'https://youtube138.p.rapidapi.com/channel/details/',
            params: { id: youtubeId, hl: 'en', gl: 'US' },
            headers: {
                'X-RapidAPI-Key': '37f62bd33cmshc44f509dac943b4p140114jsn4a30c69863c7',
                'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            let statistics = response.data.stats
            res.status(200).json({
                title: response.data.title,
                username: response.data.username,
                joined: response.data.joinedDateText,
                url: 'https://www.youtube.com/channel/' + youtubeId,
                statistics,
                description: response.data.description,
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
    static idolYoutubeVideo(req, res, next) {
        let youtubeId = req.params.youtubeId
        const options = {
            method: 'GET',
            url: 'https://youtube138.p.rapidapi.com/channel/videos/',
            params: { id: youtubeId, hl: 'en', gl: 'US' },
            headers: {
                'X-RapidAPI-Key': '37f62bd33cmshc44f509dac943b4p140114jsn4a30c69863c7',
                'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            res.status(200).json({
                videoId: response.data.contents[0].video.videoId
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
    static async findIdolById(req, res, next) {
        try {
            let { IdolId } = req.params
            let data = await Idol.findOne({
                include: [
                    {
                        model: Branch,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { id: IdolId }
            })
            if (!data) {
                throw { name: 'Data Not Found' }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = IdolController