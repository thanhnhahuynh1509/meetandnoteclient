import "./css/CardTrash.css";
import CardOption from './CardOption';
import { getComponentByLinkTrash } from '../../../../api/component-api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import DraggableComponent from "../DraggableComponent";

function CardTrash(props) {
    const {roomId} = useParams();
    const [components, setComponents] = useState(null);

    const componentTrash = async () => {
        setComponents(await getComponentByLinkTrash(roomId));
    }

    useEffect(() => {
        componentTrash();
    }, []);

    return ( <div className="CardTrash">
        <div className="CardTrash-header">
            <h4>Rác</h4>
        </div>

        <div className="CardTrash-body">
            {/* {components && components.map(c => {
                return 
                    <DraggableComponent 
                    content={c}
                    key={c.id + c.type}/>
            })} */}
        </div>
    </div> );
}

export default CardTrash;