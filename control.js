const db=require('./database')


module.exports.add=(req,res,next) => {

    console.log("data",req.body)

    const name=req.body.data.name;
    const qty=req.body.data.qty;
    const price=req.body.data.price;
    const type=req.body.data.type;
    const date=new Date();

    db.execute('insert into items (name,qty,price,date,qty_waight_type) values (?,?,?,?,?)' , [name ,qty ,price,date,type])
    .then(([data, meta]) => {

        if(data)
        {
            res.json({
                'Message' :'Items Sucessfully Added',
                'name':name,
                'price':price,
                'Qty':qty,
                'Date':date,
                status:200

            })
        }
        else{
            res.json({
                Message:error,
                status:400
            })

        }

    })
    .catch( error => { 
        console.log(error)
        res.json({
            Message:error,
            status:400
        })

    })


}


module.exports.update= (req,res,next) => {

    const name=req.body.data.name;
    let selected=req.body.data.attribute;
    const value=req.body.data.value;
        console.log(req.body)
if(name &&  selected=='quantity')
   { 
       db.execute('update items set  qty= (?) where name =(?) ',[value,name])
    .then(([data,meta])  => {
        if(data.affectedRows!=0)
                        {
                            res.json({
                                Message:"Values Updated",
                                status:200,
                               
                                'Qty':value
                            })
                        }


                      else{
                          res.json("Items Not Found")
                      }
    
    })
    .catch( error => console.log(error))
}

if(name &&  selected=='price')
   { db.execute('update items set price=(?) where name=(?)',[value,name])
    .then(([data, meta]) => {
        if(data.affectedRows!=0)
                        {
                            res.json({
                                "Message" : "Values Updated",
                                status:200,
                                'price':value
                            })
                    
                        }


                      else{
                          res.json("Items Not Found")
                      }



    })
    .catch()
}
if(name &&  selected=='name')
   { db.execute('update items set name=(?)  where name=(?)',[value,name])
    .then(([data, meta]) => {


        if(data.affectedRows!=0)
        {
            res.json({
                "Message" : "Values Updated",
                status:200,
                'name':value
                
            })
    
        }


      else{
          res.json("Items Not Found")
      }

        

    })
    .catch(error => console.log(error))
}

if(name &&  selected=='Quantity_Type')
   { db.execute('update items set qty_waight_type=(?)  where name=(?)',[value,name])
    .then(([data, meta]) => {


        if(data.affectedRows!=0)
        {
            res.json({
                "Message" : "Values Updated",
                status:200,
                'qty_waight_type':value
                
            })
    
        }


      else{
          res.json("Items Not Found")
      }

        

    })
    .catch(error => console.log(error))
}

}

module.exports.getitems=(req,res,next) =>{

    // const name=req.body.name;


    db.execute('select * from items') 
    .then(([data,meta]) =>{

        if(data.length != 0 )
        {
            res.json({
                data


            })
        }
        
        else {
            res.json({Message : error,
                status:400
            })
        }

    })
}

module.exports.deleteitems = (req,res,next) =>{

    const name=req.body.data.name;

    db.execute('delete from items where name =(?)',[name])
    .then(([data,meta]) =>{
                
        if(data.affectedRows != 0)
        { res.json({
          "Message" : "You have  sucessfully deleted  ",
          status:200,
          "Item " : name
        }
        )}

        else{
            res.json(
                { "Message" :"Item not Found "}
             )
        }

    })

    .catch(error => console.log(error))



}

module.exports.register=(req,res,next) => {
    const email=req.body.data.email;
    const password=req.body.data.password;

    console.log(req.body)

    console.log("Hit backend")

    db.execute('insert into user (email,password) values ( ? ,? )',[email,password])
    .then(([data,meta]) => {

        if(data)
        {
            res.json({
                "Message":"Sucessfully Registered",
                "status":200

            })
        }

    })
    .catch( err => {
        if(err)
        {
            console.log(err)
            res.json({
                "Message":"Error Occured -" +err.message,
                "status":400

            })
        }
    })
}

module.exports.login=(req,res,next) =>{
    const email=req.body.data.email;
    const password=req.body.data.password;

    console.log(req.body)


    db.execute('select * from user where email=(? ) and password=(?)',[email,password])
    .then(([data,meta])=>{
        if(data.length!=0)
        {
            res.setHeader('Set-cookie','logged=true' )
            res.json({
                "message ":"You have logged in",
                status:200
            })
        }
        else{
            res.json({
                "Message":"Invalid Login",
                status:400
            })
        }
    })
    .catch( error =>{
        console.log(error)
    })
}


module.exports.welcome=(req,res,next)=>{
    res.json({
        
            "Message":"Welcome to page "
        })
    

}

// module.exports.order=(req,res,next) =>{ 

//     const name =req.body.data.name;
//     const qty=req.body.data.qty;
//     const qty_weight_type=req.body.data.qty_waight_type;
//     const composition= req.body.data.composition_id;
//     const order_qty=req.body.data.buyqty;
//     const price=req.body.data.price;
//     const date=new Date();

//     console.log(req.body)

//     db.execute('insert into order_purchase (name , qty , qty_weight_type,composition_id,price,order_qty,date) values (?,?,?,?,?,?,?)',[name , qty , qty_weight_type,composition,price,order_qty,date])
//     .then(([data , meta ]) => {

//         if(data)
//         {
//             res.json({
//                 'Message' :'Order Sucessfully Added',
//                 'name':name,
//                 'composition':composition,
//                 'Qty':qty,
//                 'qty_weight_type':qty_weight_type,
//                 status:200

//             })
//         }
//     })
//     .catch( error => {
//         console.log(error)
//     })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               


// }
module.exports.order=(req,res,next) =>{ 


    const data=req.body.data;
    const date=new Date();

    console.log("data.................",data)
    console.log(req.body)
    // let data2={...data}
    // console.log("llllllll",data2)

    db.execute('insert into orderlist (items,date) values (?,?)',[data,date])
    .then(([data , meta ]) => {

        if(data)
        {
            res.json({
                'Message' :'Order Sucessfully Added',
                

            })
        }
    })
    .catch( error => {
        console.log(error)
    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               


}


module.exports.composition=(req,res,next)=>{
    console.log(req.body)
    const composition_name=req.body.data.composition_name;
    const composition=req.body.data.composition;
    const composition_weight=req.body.data.composition_weight;
    const composition_weight_type=req.body.data.composition_weight_type;
    

    db.execute('insert  into composition ( composition_name , composition , composition_weight ,composition_weight_type ) values (?,?,?,?)',[composition_name,composition,composition_weight ,composition_weight_type])
    .then(([data,meta]) => {
        if(data)
        {
            res.json({
                'Message' :'Composition Sucessfully Added',
                'name':composition_name,
                'composition':composition,
                'composition_weight':composition_weight,
                'composition_weight_type':composition_weight_type,
                status:200


            })
        }
    })
    .catch(error => console.log(error))
    

}


module.exports.report=async (req,res,next)=>{

    // console.log("inside com")
    db.execute('select item_name,cost_per_unit,item_qty,total_item_cost,id,composition,composition_weight,composition_weight_type  from sales inner join composition on sales.composition_id=composition.id')
    .then(([data,meta]) => {
        if(data)
        {
            console.log("..............data",data)
           res.json({
                data,
                status:200
            })
        }
    })
    .catch(error => console.log(error))
    

}

module.exports.getcomposition=(req,res,next)=>{

    console.log("inside com")
    db.execute('select * from composition')
    .then(([data,meta]) => {
        if(data)
        {
            console.log("..............data",data)
            res.json({
                data,
                status:200
            })
        }
    })
    .catch(error => console.log(error))
    

}

module.exports.sales=(req,res,next) => { 
    const item_name=req.body.item_name;
    const cost_per_unit=req.body.cost_per_unit;
    const item_qty=req.body.item_qty;
    const total_item_cost=req.body.total_item_cost;


    db.execute('insert into sales (item_name, cost_per_unit,item_qty,total_item_cost) values (?,?,?,?) ',[item_name, cost_per_unit,item_qty,total_item_cost])
    .then(([data,meta])=>{

        if(data)
        {
            res.json({
                'Message' :'Sales Data Sucessfully Added',
                'name':item_name,
                'cost_per_unit':cost_per_unit,
                'item_qty':item_qty,
                'total_item_cost':total_item_cost

            })
        }

    })
    .catch(error => console.log(error))

}

module.exports.getsales=(req,res,next) => {
    // const item_name=req.body.item_name;
    // const cost_per_unit=req.body.cost_per_unit;
    // const item_qty=req.body.item_qty;
    // const total_item_cost=req.body.total_item_cost;


    db.execute('select * from sales  ')
    .then(([data,meta])=>{  

        if(data)
        {
            res.json({
                data,
                status:200
            })
        }
    })
    .catch(error => console.log(error))
}

module.exports.updatecomposition=(req,res,next)=>{
    
    const id=req.body.data.id;
    let selected=req.body.data.attribute;
    const value=req.body.data.value;
        console.log(req.body)
if(id &&  selected=='Composition')
   { 
       db.execute('update composition set  composition= (?) where id =(?) ',[value,id])
    .then(([data,meta])  => {
        if(data.affectedRows!=0)
                        {
                            res.json({
                                Message:"Values Updated",
                                status:200,
                               
                                'Composition':value
                            })
                        }


                      else{
                          res.json(" Not Found")
                      }
    
    })
    .catch( error => console.log(error))
}

if(id &&  selected=='name')
   { db.execute('update composition set composition_name=(?) where id=(?)',[value,id])
    .then(([data, meta]) => {
        if(data.affectedRows!=0)
                        {
                            res.json({
                                "Message" : "Values Updated",
                                status:200,
                                'Name':value
                            })
                    
                        }


                      else{
                          res.json(" Not Found")
                      }



    })
    .catch()
}
if(id &&  selected=='Composition_Weight')
   { db.execute('update composition set composition_Weight=(?)  where id=(?)',[value,id])
    .then(([data, meta]) => {


        if(data.affectedRows!=0)
        {
            res.json({
                "Message" : "Values Updated",
                status:200,
                'Composition Weight':value
                
            })
    
        }


      else{
          res.json(" Not Found")
      }

        

    })
    .catch(error => console.log(error))
}

if(id &&  selected=='Composition_Weight_Type')
   { db.execute('update composition set composition_weight_type=(?)  where id=(?)',[value,id])
    .then(([data, meta]) => {


        if(data.affectedRows!=0)
        {
            res.json({
                "Message" : "Values Updated",
                status:200,
                'Composition Weight Type':value
                
            })
    
        }


      else{
          res.json("Items Not Found")
      }

        

    })
    .catch(error => console.log(error))
}

}

module.exports.deletecomposition = (req,res,next) =>{

    console.log(req.body)
    const id=req.body.data.id;


    db.execute('delete from composition where id=(?)',[id])
    .then(([data,meta]) =>{
                
        if(data.affectedRows != 0)
        { res.json({
          "Message" : "You have  sucessfully deleted  ",
          status:200,
          "Id " : id
        }
        )}

        else{
            res.json(
                { "Message" :" not Found "}
             )
        }

    })

    .catch(error => console.log(error))



}

module.exports.addsales=(req,res,next) => {

    console.log("data",req.body)

    const name=req.body.data.name;
    const qty=req.body.data.qty;
    const unit=req.body.data.unit;
    const total=req.body.data.total;
    let comp_id=req.body.data.comp_id;
    const date=new Date();

    db.execute('insert into sales (item_name,item_qty,cost_per_unit,total_item_cost,date,composition_id) values (?,?,?,?,?,?)' , [name ,qty ,unit,total,date,comp_id])
    .then(([data, meta]) => {

        if(data)
        {
            res.json({
                'Message' :'Items Sucessfully Added',
                'name':name,
                'Unit':unit,
                'Qty':qty,
                "Total Qty":total,
                'Date':date,
                status:200

            })
        }
        else{
            res.json({
                Message:error,
                status:400
            })

        }

    })
    .catch( error => { 
        console.log(error)
        res.json({
            Message:error,
            status:400
        })

    })


}
module.exports.getorder=(req,res,next) => {
    
    db.execute('select * from orderlist  ')
    .then(([data,meta])=>{  

        if(data)
        {
            res.json({
                data,
                status:200
            })
        }
    })
    .catch(error => console.log(error))
}