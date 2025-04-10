const asyncHandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;

// const asyncHandler = (fn) => (req, res, next) =>{
//     try{
//         await finally(req, res ,next);
//     }catch(error){
//         res.status(error.status || 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }
