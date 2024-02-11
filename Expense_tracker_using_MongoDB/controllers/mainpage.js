
exports.gethomePage = (req, res, next) => {
    res.sendFile('sign-up.html', { root: 'views' });
   
}

exports.getloginpage = (req,res,next) =>{
    res.sendFile('login.html',{root:'views'});
}

exports.getforgotoage = (req,res,next) =>{
    res.sendFile('forgotPassword.html',{root:'views'});
}

exports.getindex3page = (req,res,next) =>{
    res.sendFile('index3.html',{root:'views'});
}

exports.getindex1page = (req,res,next) =>{
    res.sendFile('index1.html',{root:'views'});
}

exports.getindex2page = (req,res,next) =>{
    res.sendFile('index2.html',{root:'views'});
}

exports.getindex4page = (req,res,next) =>{
    res.sendFile('index4.html',{root:'views'});
}


exports.getreportspage = (req,res,next) =>{
    res.sendFile('reports.html',{root:'views'});
}

exports.getresetpasspage= (req,res,next) =>{
    res.sendFile('resetPassword.html',{root:'views'});
}
