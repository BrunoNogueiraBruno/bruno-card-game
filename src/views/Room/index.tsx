import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import cards from '../../assets/cards/cards.json';

const Room = () => {
    const { id } = useParams()
    const roomId = localStorage.getItem("room-id") || ""

    if (id !== roomId) return <div>Room not found</div>


    return (
        <div>
            Room
            <Card attributes={cards[0]} />
            <Card attributes={cards[1]} />
            </div>
    )
}

export default Room
