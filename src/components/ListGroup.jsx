import styles from "../styles/ListGroup.module.scss";



export function ListGroup({ colored, hasBorder, children, ...restProps }) {

    const listGroupClasses = [styles.listGroup,
                       colored && styles.colored,
                    hasBorder && styles.hasBorder].join(" ");

    return (
        <ul className={ listGroupClasses }
            {...restProps} >

            {children}

        </ul>
    )
}


ListGroup.Item = ({ children, ...restProps }) => {
    return (
        <li className={styles.listGroupItem} {...restProps}>
            {children}
        </li>
    )
}


