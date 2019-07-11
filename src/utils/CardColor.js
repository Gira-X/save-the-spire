import * as React from "react";

export default class CardColor extends React.Component {

	static getHexColor(card, isHovering) {
		if (card.color === 'RED') {
			return isHovering ? '#a50000' : '#c30000';
		} else if (card.color === 'GREEN') {
			return isHovering ? '#00a500' : '#00c300';
		} else if (card.color === 'BLUE') {
			return isHovering ? '#0000a5' : '#0000c3';
		} else if (card.color === 'COLORLESS') {
			return isHovering ? '#5f5f5f' : '#737373';
		} else if (card.color === 'CURSE') {
			return isHovering ? '#000' : '#333';
		}
	}
}