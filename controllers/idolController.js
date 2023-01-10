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
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            ],
            attributes:{
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

        // const APIKey = 'AIzaSyD9QpelfpjJj2KdfcpVlbrrumSktCikAYA';
        // const Userid = 'UCP0BspO_AMEe3aQqqpo89Dg';
        let youtubeId = req.params.youtubeId
        // console.log(youtubeId);
        // fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeId}&key=${APIKey}`)
        // .then(response => {
        //     return response.json()
        // })
        // .then(data => {
        //     console.log(data.items[0].statistics);
        //     res.status(200).json(data.items[0].statistics)
        // })
        // .catch(err => console.error(err));
        // // res.status(200).json(data)

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
            console.log(response.data);

            let statistics = response.data.stats
            // let songs = response.data.data.artist.discography.singles.items
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
}

module.exports = IdolController