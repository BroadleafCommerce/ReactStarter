import React from 'react'
import ResultListItem from 'catalog/search/components/ResultListItem'
import './ResultList.scss'

export const ResultList = ({
    numberPerRow = 3,
    results = [],
}) => (
    <div styleName='ResultList' className='row'>
        {results.map(result =>
            <div key={result.id} className={`col-md-${12/numberPerRow | 0}`}>
                <ResultListItem {...result}/>
            </div>
        )}
    </div>
)

ResultList.propTypes = {
    numberPerRow: React.PropTypes.number,
    results : React.PropTypes.arrayOf(React.PropTypes.object)
}

export default ResultList
