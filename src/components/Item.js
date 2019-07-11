import React, { Component } from 'react';
import styles from '../styles/Potions.module.css'
import cards from "./CardsJSON";
import CardColor from "../utils/CardColor";

class Item extends Component {

    state = {hover: false};

    toggleHover = () => {
        this.setState({hover: !this.state.hover});
    };

    createStyle() {
        let commonStyle = {
            textAlign: 'center',
            minHeight: '40px',
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            cursor: 'pointer',
        };

        let specificStyle;
        // the 'Card' and 'CardItem' types are handled directly in render()
        if (this.props.type === 'RelicItem') {
            specificStyle = {
                backgroundColor: this.state.hover ? '#17bebb' : '#27cecb',
                border: '1px solid #17bebb'
            };
        } else if (this.props.type === 'Relic') {
            specificStyle = {
                backgroundColor: this.state.hover ? '#46d38f' : '#56e39f',
                border: '1px solid #46d38f'
            };
        } else if (this.props.type === 'Potion') {
            specificStyle = {
                backgroundColor: this.state.hover ? '#C4E717' : '#D7EE62',
                border: '1px solid #C4E717'
            };
        }

        if (this.props.bottled === true) {
            specificStyle.border = '3px solid #ffd700';
        }

        return {
            ...commonStyle, 
            ...specificStyle, 
            ...this.props.style
        };
    }

    render() {
        let style = this.createStyle();

        if (this.props.type === 'Potion') {
            if (this.props.active) {
                style.border = "2px solid red"
            }

            let key = `potion-${this.props.isPlaceholder ? "placeholder" : this.props.name.split(" ")[0].toLowerCase()}`

            return (
                <div id={this.props.id} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.props.onClick} style={style}>
                    <div className={typeof styles[key] === "undefined" ? styles.potion_placeholder : styles[key]}></div>
                </div>

            )
        } else if (this.props.type === 'Card' || this.props.type === 'CardItem') {
            const cardName = this.props.name;
            let card;
        	if (cardName.endsWith('+')) {
        	    card = cards[cardName.substring(0, cardName.length - 1)];
            } else {
        	    card = cards[cardName];
            }
            let cssColor = CardColor.getHexColor(card, this.state.hover);
            style.backgroundColor = cssColor;
            if (this.props.type === 'CardItem') {
                style.borderBottom = '1px solid #999';
                style.minWidth = '250px';
                style = {
                    ...style,
                    margin: '0 auto',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    borderTop: '5px solid white',
                    borderBottom: '5px solid white',
                };
            } else {
                if (this.props.bottled === false) {
                    // when bottled, we use the border style from createStyle()
                    style.border = '1px solid ' + cssColor;
                }
            }
            if (card.color === 'CURSE') {
                // Curses have a black background, so we also need to set a white text color to be
                // able to read the card name
                style.color = '#fff';
            }
        }

        return (
            <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.props.onClick} style={style}>
                {this.props.name}
            </div>
        );
    }
}

export default Item;
