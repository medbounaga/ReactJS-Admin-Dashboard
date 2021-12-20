import styles from "../styles/Card.module.scss";

export function Card({children, ...restProps}){

    return (

        <div className={styles.card}>
            {children}                     
        </div>

    )  
}

Card.Header = function CardHeader({title, children, ...restProps}){

    return (
        <div className={styles.cardHeader}>              
                {children}
        </div>
    )
}

Card.Footer = function CardFooter({title, children, className, ...restProps}){

    return (
        <div className={`${styles.cardFooter} ${className}`} >              
                {children}
                
        </div>
    )
}

Card.Title = function CardTitle({title, ...restProps}){
    return (
        
        <span className={styles.cardTitle}>{title}</span>
                
    )

}

Card.Body = function CardBody({children, ...restProps}){

    return (
        <div className={styles.cardBody}>
               {children}
        </div>
    )
}