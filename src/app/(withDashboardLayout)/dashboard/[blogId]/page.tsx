import Alledit from "@/components/Shared/Alledit";


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
    // console.log(params.blogId);

    
     const res = await fetch(`https://book-review-server-two.vercel.app/reviews/${params.blogId}`, {
       cache: 'no-store',
     });
    
  
    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }
  
    const blog: Blog = await res.json();
  
    // console.log(blog);

    return (
        <div>
            <Alledit blog={blog}/>
        </div>
    );
};

export default BlogPage;