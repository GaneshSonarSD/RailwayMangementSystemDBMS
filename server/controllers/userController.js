const mysql = require('mysql');



// db connection pool
const pool =mysql.createPool({
    connectionLimit :100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});


//view user

exports.view = (req,res) => {

//CONNECT TOB DB

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);


/// user connection 

connection.query('(SELECT  *  FROM western) UNION (SELECT  *   FROM central)', (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('home', { rows });
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);




});


});


}
/// fav 
/*
exports.favt = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID favt' + connection.threadId);
    
   // let searchTerm = req.body.search;
   // console.log(searchTerm);
    /// user connection 
    
    connection.query('(SELECT * FROM favtrains)', (err,rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('favtrain', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });


}
*/
exports.favt = (req,res) => {

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);


/// user connection 

connection.query('SELECT  *  FROM ftable ', (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('favtrain', { rows });
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);




});


});


}

exports.form = (req,res) => {
    res.render('adduser');
}

//view user

exports.check = (req,res) => {

    //CONNECT TOB DB
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    
    
    /// user connection 
    
    connection.query('(SELECT  *  FROM western) UNION (SELECT  *  FROM central)', (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('admin', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    
    
    }




exports.find = (req,res) => {
    

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    
        let searchTerm = req.body.search;
    
   // console.log(searchTerm);
    /// user connection 
    
    //connection.query('SELECT * FROM user WHERE name LIKE ? OR full_name LIKE ?',['%' + searchTerm +'%', '%' + searchTerm +'%'], (err,rows) => {
        connection.query('SELECT * FROM western WHERE Source_Name LIKE ? UNION SELECT * FROM central WHERE Source_Name LIKE ?',['%' + searchTerm +'%', '%' + searchTerm +'%'], (err,rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    
    
    }
    exports.dest = (req,res) => {
    

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log('Connected as ID' + connection.threadId);
        
            let searchTerm = req.body.search;
        
       // console.log(searchTerm);
        /// user connection 
        
        //connection.query('SELECT * FROM user WHERE name LIKE ? OR full_name LIKE ?',['%' + searchTerm +'%', '%' + searchTerm +'%'], (err,rows) => {
            connection.query('SELECT * FROM western WHERE Dest_Name LIKE ? UNION SELECT * FROM central WHERE Dest_Name LIKE ?',['%' + searchTerm +'%', '%' + searchTerm +'%'], (err,rows) => {
            /// when done with the connection ,releasse it 
            connection.release();
        
            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The the data from the user table:  \n', rows);
        
        
        
        
        });
        
        
        });
        
        
        }






  
    
   
    exports.west = (req,res) => {
    

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log('Connected as ID' + connection.threadId);
        
       // let searchTerm = req.body.search;
       // console.log(searchTerm);
        /// user connection 
        
        connection.query('SELECT * FROM western', (err,rows) => {
            /// when done with the connection ,releasse it 
            connection.release();
        
            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The the data from the user table:  \n', rows);
        
        
        
        
        });
        
        
        });


    }

    exports.central = (req,res) => {
    

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log('Connected as ID' + connection.threadId);
        
       // let searchTerm = req.body.search;
       // console.log(searchTerm);
        /// user connection 
        
        connection.query('SELECT * FROM central', (err,rows) => {
            /// when done with the connection ,releasse it 
            connection.release();
        
            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The the data from the user table:  \n', rows);
        
        
        
        
        });
        
        
        });


    }


    ///adding data 

    
    exports.create = (req,res) => {

        const {Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price} = req.body;
        
        const division =  req.body.division;
        if (division === 'central') {


            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log('Connected as ID' + connection.threadId);
            
           // let searchTerm = req.body.search;
           // console.log(searchTerm);
            /// user connection 
            
            connection.query('INSERT INTO central SET Train_No = ?, Source_Name = ?,departure_time =?,Dest_Name = ?,Approaching_time =?,F_or_S= ?,Ticket_price= ?',[Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price], (err,rows) => {
                /// when done with the connection ,releasse it 
                connection.release();
            
                if(!err){
                    res.render('adduser', { rows });
                } else {
                    console.log(err);
                }
                console.log('The the data from the user table:  \n', rows);
            
            
            
            
            });
            
            
            });
    
    
        }
            
        else { 
            
        

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log('Connected as ID' + connection.threadId);
        
       // let searchTerm = req.body.search;
       // console.log(searchTerm);
        /// user connection 
        
        connection.query('INSERT INTO western SET Train_No = ?, Source_Name = ?,departure_time =?,Dest_Name = ?,Approaching_time =?,F_or_S= ?,Ticket_price= ?',[Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price], (err,rows) => {
            /// when done with the connection ,releasse it 
            connection.release();
        
            if(!err){
                res.render('adduser', { rows });
            } else {
                console.log(err);
            }
            console.log('The the data from the user table:  \n', rows);
        
        
        
        
        });
        
        
        });
    }
}
exports.edit = (req,res) => {
 


    
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
 

/// user connection 

connection.query('SELECT * FROM western WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('edituser', { rows });
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);




});


});
}



/// edit central trains

exports.edits = (req,res) => {
    
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
 

/// user connection 

connection.query('SELECT * FROM central WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('edit-cent', { rows });
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);




});


});
}




    
  /*  pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
     
    
    /// user connection 
    
    connection.query('SELECT * FROM central WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('edituser', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });

    }
    */
    
 ///upadates for central
 

// updateing the central trian
exports.updates = (req,res) => {

    
    const {Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price} = req.body;


    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    /// user connection 
    
    connection.query('UPDATE central SET Train_No = ?, Source_Name = ?,Dest_Name = ?,Approaching_time =?,F_or_S= ?,Ticket_price= ? WHERE departure_time = ?',[Train_No, Source_Name,Dest_Name,Approaching_time,F_or_S,Ticket_price ,req.params.departure_time], (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
               
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
 

/// user connection 

connection.query('SELECT * FROM central WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('edit-cent', { rows , alert: `Train No: ${Train_No} has been updated`});
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);


});


});
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    }   




// updateing the user
exports.update = (req,res) => {

    
    const {Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price} = req.body;


    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    /// user connection 
    
    connection.query('UPDATE western SET Train_No = ?, Source_Name = ?,Dest_Name = ?,Approaching_time =?,F_or_S= ?,Ticket_price= ? WHERE departure_time = ?',[Train_No, Source_Name,Dest_Name,Approaching_time,F_or_S,Ticket_price ,req.params.departure_time], (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
               
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
 

/// user connection 

connection.query('SELECT * FROM western WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.render('edituser', { rows , alert: `Train No: ${Train_No} has been updated`});
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);


});


});
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    }
    
    // delete the train

exports.delete = (req,res) => {
 
        
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
 

/// user connection 

connection.query('DELETE FROM western WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
    /// when done with the connection ,releasse it 
    connection.release();

    if(!err){
        res.redirect('/');
    } else {
        console.log(err);
    }
    console.log('The the data from the user table:  \n', rows);




});


});

}
///deleting fav entries
exports.deletefav = (req,res) => {
 
        
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
     
    
    /// user connection 
    
    connection.query('DELETE FROM ftable WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.redirect('/');
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    
    }
    


/// fav
exports.fav = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    
   // let searchTerm = req.body.search;
   // console.log(searchTerm);
    /// user connection 
    
    connection.query('SELECT * FROM fav;', (err,rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('favtrain', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });


}


//clearing fav tablwe

exports.clear = (req,res) => {
 
        
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
     
    
    /// user connection 
    
    connection.query('Truncate ftable', (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    }
 
exports.editfav = (req,res) => {


    //CONNECT TOB DB
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);

    /// user connection 
    
    connection.query('SELECT  *  FROM western WHERE departure_time = ?',[req.params.departure_time], (err, rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('favedit', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });
    
    
    }





    

// updateing the user
exports.addf = (req,res) => {

    
    const {Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price} = req.body;
    console.log(req.body,'check the body output');


    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
    
   // let searchTerm = req.body.search;
   // console.log(searchTerm);
    /// user connection 
    
    connection.query('INSERT INTO ftable SET Train_No = ?, Source_Name = ?,departure_time =?,Dest_Name = ?,Approaching_time =?,F_or_S= ?,Ticket_price= ?',[Train_No, Source_Name,departure_time,Dest_Name,Approaching_time,F_or_S,Ticket_price], (err,rows) => {
        /// when done with the connection ,releasse it 
        connection.release();
    
        if(!err){
            res.render('favtrain', { rows });
        } else {
            console.log(err);
        }
        console.log('The the data from the user table:  \n', rows);
    
    
    
    
    });
    
    
    });


}