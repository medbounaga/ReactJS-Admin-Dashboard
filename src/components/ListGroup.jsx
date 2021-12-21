import styles from "../styles/ListGroup.module.scss";

export function ListGroup({ children, ...restProps }) {
    return (
        <ul className={styles.listGroup} {...restProps}>
            {children}
        </ul>
    )
}


ListGroup.Item =  ({ children, ...restProps }) => {
    return (
        <li className={styles.listGroupItem} {...restProps}>
            {children}
        </li>
    )
}


