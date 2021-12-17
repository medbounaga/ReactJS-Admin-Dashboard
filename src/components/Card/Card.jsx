import "./card.scss";
export function Card({title,children, restProps}){

    return (

        <div className="card">
            <div className="card-header">
                <span className="card-title h5">{title}</span>
            </div>
            <div className="card-content">{children}</div>           
        </div>

    )
    
}