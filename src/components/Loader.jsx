import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Loader = ({height, ...restProps}) => {
    return (
        <div style={{ padding: "20px" }} {...restProps}>
                    <Skeleton count={height} />
        </div>
    )
}

