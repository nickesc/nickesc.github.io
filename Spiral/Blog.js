class Reply {

    createElement() {
        let replyDiv = document.createElement('div');
        let replyAuthor = document.createElement('div')
        //let replyImg = document.createElement('img')
        let replyContent = document.createElement('div')
        let replyTime = document.createElement('div')

        replyDiv.className = "reply"

        //replyImg.className = "replyImg"

        replyAuthor.innerHTML = "<img class ='replyImg' src = '"+this.img+"' alt = '"+"pfp"+"'>"+this.author
        replyAuthor.className = "replyAuthor"
        replyContent.className = "replyContent"
        replyContent.innerHTML = this.content
        replyTime.className = "replyTime"
        if (this.updated!==this.published){
            replyTime.innerHTML = "<i>updated: "+this.updated+"</i>"
        }
        else{
            replyTime.innerHTML = "published: "+this.published
        }

        //replyDiv.appendChild(replyImg)
        replyDiv.appendChild(replyAuthor)
        replyDiv.appendChild(replyTime)
        replyDiv.appendChild(replyContent)

        return replyDiv;
    }

    constructor(reply) {
        this.id = reply.id
        this.author = reply.author.displayName
        this.img = reply.author.image.url
        this.content = reply.content
        this.published = new Date(Date.parse(reply.published)).toLocaleString()
        this.updated = new Date(Date.parse(reply.updated)).toLocaleString()
        this.selfLink = reply.selfLink
    }

}

class Post {

    createElement() {

        let postDiv = document.createElement('div')
        let postTitle = document.createElement('div')
        let postAuthor = document.createElement('div')
        let postTime = document.createElement('div')
        let postContent = document.createElement('div')
        let postURL = document.createElement('a')
        let postReplies = document.createElement('div')
        let postRePrompt = document.createElement('div')

        postDiv.className = "postDiv"
        postTitle.className = "postTitle"
        postTitle.innerHTML = this.title
        postAuthor.className = "postAuthor"
        postAuthor.innerHTML = this.author
        postTime.className = "postTime"
        if (this.updated!==this.published){
            postTime.innerHTML = "published: "+this.published +"; <i>updated: "+this.updated+"</i>"
        }
        else{
            postTime.innerHTML = "published: "+this.published
        }
        postContent.className = "postContent"
        postContent.innerHTML = this.content
        postURL.className = "postURL"
        postURL.href = this.url
        postURL.innerHTML = "Post URL"
        postReplies.className = "postReplies"
        postRePrompt.className = "PostRePrompt"
        postRePrompt.innerHTML = "Replies:"

        postDiv.appendChild(postTitle)
        postDiv.appendChild(postAuthor)
        postDiv.appendChild(postTime)
        postDiv.appendChild(postContent)
        postDiv.appendChild(postURL)

        if(this.count > 0) {
            postReplies.appendChild(postRePrompt)
            for (let i = 0; i < this.count; i++) {
                postReplies.appendChild(this.replies[i].createElement())
            }
            postDiv.appendChild(postReplies)
        }




        return postDiv
    }

    getReplyArray(replies) {
        let replyArray = []
        for( let i = 0; i<this.count; i++){
            replyArray.push(new Reply(replies[i]))
        }


        return replyArray
    }

    constructor(post){

        this.id = post.id
        this.title = post.title
        this.content = post.content
        this.labels = post.labels
        this.published = new Date(Date.parse(post.published)).toLocaleString()
        this.updated = new Date(Date.parse(post.updated)).toLocaleString()
        this.author = post.author.displayName
        this.replies = this.getReplyArray(post.replies)
        this.count = this.replies.length
        this.self = post.selfLink
        this.url = post.url

    }
}

class Blog {

    createElementList(){

        let elementList = []

        for(let i = 0; i<this.posts.length; i++){
            elementList.push(this.posts[i].createElement())
        }
        return elementList;
    }

    getPostArray(posts) {
        let postArray = []
        for( let i = 0; i<posts.length; i++){
            postArray.push(new Post(posts[i]))

            //document.getElementById("content").appendChild(postArray[i].createElement())
        }
        return postArray
    }

    constructor(blog) {

        this.name = blog.info.name
        this.published = blog.info.published
        this.updated = blog.info.updated
        this.selfLink = blog.info.selfLink
        this.url = blog.info.url
        this.postURL = blog.info.posts.selfLink
        this.count = blog.info.posts.totalItems
        this.posts = this.getPostArray(blog.posts)
    }


}