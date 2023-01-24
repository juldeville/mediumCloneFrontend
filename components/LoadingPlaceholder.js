import _ from "lodash"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingPlaceholder = ({
    count = 2
  }) =>
    _.range(count).map((index) => (
      <div key={index} style={{width: "600px", display:'flex', justifyContent: 'center', margin: '20px'}}>
        <Skeleton circle width={50} height={50} style={{marginRight:'20px'}}/>
        <div>
          <Skeleton width={300} style={{marginBottom:'20px'}} />
          <Skeleton width={300} height={100 } style={{marginBottom:'20px'}}/>
          
        </div>
      </div>
    ));

export default LoadingPlaceholder