import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const mockData = [
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72TppF9ugpGnL-ODbuIAze-R3vTq3F98eiS7NbwTpELJn-JmPFw',
        title: 'pls',
        author: 'dogelover95',
        cols: 2
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGB-02W3X8-fFs84R5a-IT1d-cODl7pJhjzjlHYHh10E0T9TuDvg',
        title: 'Doge swag',
        author: 'monetizeAMeme',
        cols: 1
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO0_ZsuQW5TqKcSamzbUjnHf6YZKgvtA4WwBLQbhQ4jq3cfWnA',
        title: 'Doge loaf',
        author: 'dogelover95',
        cols: 1
    },

    {
        img: 'https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg',
        title: 'Classic doge',
        author: 'wowman48',
        cols: 2
    },
    {
        img: 'https://pics.me.me/fat-doge-8386016.png',
        title: 'Fat doge',
        author: 'dogelover95',
        cols: 2
    },
    {
        img: 'https://pics.me.me/if-a-doge-which-pant-or-much-choice-werd-19380127.png',
        title: 'Doge',
        author: 'dogelover95',
        cols: 1
    },

    {
        img: 'https://static1.squarespace.com/static/5a2cbecb90bade51df5b8eea/t/5ba2a41e6d2a733c38d2c0c6/1537385514393/Doge.PNG',
        title: 'Doge Coin',
        author: 'dogelover95',
        cols: 1
    },
];

const useStyles = makeStyles(theme => ({
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}));

export default function ImageFeed() {
    const classes = useStyles();
    return (
        <section>
            <form>
                Sorting to go here.
            </form>
            <GridList cols={3} cellHeight={350}>
                {mockData.map(tile => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                            <IconButton className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                        }/>
                    </GridListTile>
                ))}
            </GridList>
        </section>
    )
}