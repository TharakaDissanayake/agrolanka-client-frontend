// import React, { Component } from "react";
// import _ from "lodash";

// class Pagination extends Component {
//   state = {};

//   render() {
//     const numOfPages = Math.ceil(
//       parseInt(this.props.count) / parseInt(this.props.size)
//     );
//     if (numOfPages === 1) {
//       return null;
//     }
//     const pagesArray = _.range(1, numOfPages + 1);
//     return (
//       <div>

//         {console.log(numOfPages)}
//         <nav aria-label="Page navigation example">
//           <ul class="pagination justify-content-end ">
//           <ul class="pagination flex-wrap">
//             <li className="page-item">
//               <a
//                 className="page-link"
//                 onClick={() => this.props.handlePreviousChange()}
//               >
//                 <span aria-hidden="false">&laquo;</span>
//                 <span class="sr-only">Previous</span>
//               </a>
//             </li>
//             {pagesArray.map((page) => (
//               <li
//                 className={
//                   page === this.props.page ? "page-item active" : "page-item"
//                 }
//                 key={page}
//               >
//                 <a
//                   className="page-link"
//                   onClick={() => this.props.handlePageChange(page)}
//                 >
//                   {page}
//                 </a>
//               </li>
//             ))}
//             <li className="page-item">
//               <a
//                 className="page-link"
//                 onClick={() => this.props.handleNextChange(numOfPages)}
//               >
//                 <span aria-hidden="true">&raquo;</span>
//                 <span class="sr-only">Next</span>
//               </a>
//             </li>
//           </ul>
//           </ul>
//         </nav>
//       </div>
//     );
//   }
// }

// export default Pagination;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import _ from "lodash";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(4),
    },
  },
}));

export default function PaginationComponent(props) {
  const classes = useStyles();
  const numOfPages = Math.ceil(
    parseInt(props.count) / parseInt(props.size)
  );
  return (
    <div className={classes.root}>

      <Pagination showFirstButton showLastButton count={numOfPages} page={props.page} color="primary"
        onChange={props.handlePageChange}
      //  onChange={() => props.handlePageChange(props.page)} 
      />

    </div>
  );
}
