var loki = require('lokijs')

var db = new loki('db.json')

db.addCollection('USER').insert([
    {
        username: 'foo',
        password: 'foo',
        email: 'foo@email.com',
        doc: '1/1/1998'
    },
    {
        username: 'bar',
        password: 'bar',
        email: 'bar@email.com',
        doc: '1/1/1998'
    },
    {
        username: 'john',
        password: 'john',
        email: 'hohn@j.com',
        doc: '1/1/1998'
    },
    {
        username: 'jack',
        password: 'jack',
        email: 'jack@s.com',
        doc: '1/1/1998'
    },
    {
        username: 'jill',
        password: 'jill',
        email: 'jill@e.com',
        doc: '1/1/1998'
    }
])

db.addCollection('THREADS').insert([
    {
        thread_id:1,
        title:'thread 1',
        description:'This is content of thread 1',
        doc: '1/2/1998',
        owner:'foo',
        comments:[
            {
                index:1,
                replier:'bar',
                reply:'bar replied here',
                doc: '1/2/1998',
                upVote:2,
                downVote:1
            },
            {
                index:2,
                replier:'jack',
                reply:'jack replied here',
                doc: '1/2/1998',
                upVote:3,
                downVote:2
            }
        ]
    },

    {
        thread_id:2,
        title:'thread 2',
        description:'hey there this is thread 2',
        doc: '1/2/1998',
        owner:'bar',
        comments:[
            {
                index:1,
                replier:'john',
                reply:'john replied positive',
                doc: '1/2/1998',
                upVote:4,
                downVote:1
            },
            {
                index:2,
                replier:'jack',
                reply:'jack replied negatively',
                doc: '1/2/1998',
                upVote:4,
                downVote:1
            },
            {
                index:3,
                replier:'bar',
                reply:'bar replied here',
                doc: '1/2/1998',
                upVote:0,
                downVote:0
            }
        ]
    },

    {
        thread_id:3,
        title:'thread 3',
        description:'welcome to threa d3',
        doc: '1/2/1998',
        owner:'john',
        comments:[
            {
                index:1,
                replier:'jill',
                reply:'jill',
                doc: '1/2/1998',
                upVote:2,
                downVote:1
            },
            {
                index:2,
                replier:'john',
                reply:'john replied to jill',
                doc: '1/2/1998',
                upVote:3,
                downVote:1
            },
            {
                index:3,
                replier:'jill',
                reply:'jill corrected himself',
                doc: '1/2/1998',
                upVote:5,
                downVote:2
            }
        ]
    }
])

db.addCollection('COMMENTS_RECORDS').insert([
    {
        thread_id:1,
        index:1,
        username:'bar'
    },
    {
       thread_id:1,
       index:2,
       username:'jack'
   },
   {
       thread_id:2,
       index:1,
       username:'john'
   },
   {
       thread_id:2,
       index:2,
       username:'jack'
   },
   {
       thread_id:2,
       index:3,
       username:'bar'
   },
   {
       thread_id:3,
       index:1,
       username:'jill'
   },
   {
       thread_id:3,
       index:2,
       username:'john'
   },
   {
       thread_id:3,
       index:3,
       username:'jill'
   }
])

db.addCollection('THREAD_RECORDS').insert([
    {
        thread_id: 1,
        username: 'foo'
    },
    {
        thread_id: 2,
        username: 'bar'
    },
    {
        thread_id: 3,
        username: 'john'
    }
])
db.saveDatabase();