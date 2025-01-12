import React from "react"

import Zero from "./zero.svg?react"
import One from "./one.svg?react"
import Two from "./two.svg?react"
import Three from "./three.svg?react"
import Four from "./four.svg?react"
import Five from "./five.svg?react"
import Six from "./six.svg?react"
import Seven from "./seven.svg?react"
import Eight from "./eight.svg?react"
import Nine from "./nine.svg?react"
import Skip from "./skip.svg?react"
import Reverse from "./reverse.svg?react"
import DrawTwo from "./draw-two.svg?react"
import Wild from "./wild.svg?react"
import DrawFour from "./draw-four.svg?react"
import CardBack from "./card-back.svg?react"

interface ICardImages {
    [index:string]: React.FC<React.SVGProps<SVGSVGElement>>
}

const CardImages = {
    "zero": Zero,
    "one": One,
    "two": Two,
    "three": Three,
    "four": Four,
    "five": Five,
    "six": Six,
    "seven": Seven,
    "eight": Eight,
    "nine": Nine,
    "skip": Skip,
    "reverse": Reverse,
    "draw-two": DrawTwo,
    "wild": Wild,
    "draw-four": DrawFour,
    "card-back": CardBack
} as ICardImages

export default CardImages