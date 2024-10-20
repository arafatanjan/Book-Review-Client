import Editpage from "../editreview/page";

interface BlogId {
    params: {
        blogId: number;
    };
  }
  
  interface Blog {
    _id: string;
    title: string;
    author: string;
    reviewText: string;
    rating: number;
  }

  const BlogPage = async ({ params }: BlogId) => {
    console.log(params.blogId);

    
     const res = await fetch(`http://localhost:5000/reviews/${params.blogId}`, {
       cache: 'no-store',
     });
    
  
    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }
  
    const blog: Blog = await res.json();
  
    console.log(blog);

    return (
        <div>
            <Editpage blog={blog}/>
        </div>
    );
};

export default BlogPage;