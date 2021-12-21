import { Card, ListGroup } from "../components";
import styles from "../styles/TopProducts.module.scss";





export function TopProducts() {

    return (
        <Card>
            <Card.Header >
                <Card.Title title="Selling Products" />
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <div className={styles.thumb}><img src="/img/Headset-standard.png" alt="" /></div>
                        <div className={styles.info}>
                            <div className={styles.title}>Pink Fitness Tracker</div>
                            <div className={styles.price}>$99.49</div>
                        </div>
                        <div className={styles.total}>
                            <div className={styles.amount}>$ 4875.01</div>
                            <div className={styles.count}>49 Sold</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className={styles.thumb}><img src="/img/Headset-standard.png" alt="" /></div>
                        <div className={styles.info}>
                            <div className={styles.title}>Pink Fitness Tracker</div>
                            <div className={styles.price}>$99.49</div>
                        </div>
                        <div className={styles.total}>
                            <div className={styles.amount}>$ 4875.01</div>
                            <div className={styles.count}>49 Sold</div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}