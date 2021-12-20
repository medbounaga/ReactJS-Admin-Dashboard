import styles from "../styles/Table.module.scss"

export const Table = ({ children, ...restProps }) => {
    return <table className={styles.table} {...restProps}>{children}</table>;
};

Table.Head = ({ children, ...restProps }) => {
    return <thead {...restProps}>{children}</thead>;
};

Table.Body = ({ children, ...restProps }) => {
    return <tbody {...restProps}>{children}</tbody>;
};


Table.Foot = ({ children, ...restProps }) => {
    return <tfoot {...restProps}>{children}</tfoot>;
};

Table.TR = ({ children, ...restProps }) => {
    return <tr {...restProps}>{children}</tr>;
};

Table.TH = ({ children, ...restProps }) => {
    return <th {...restProps}>{children}</th>;
};

Table.TD = ({ children, ...restProps }) => {
    return <td {...restProps}>{children}</td>;
};