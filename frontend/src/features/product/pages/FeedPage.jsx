import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { postService } from '../../product/services/postService';

function PostCard({ post, currentUser, onLike, onComment, onDelete }) {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const isLiked = post.likes?.includes(currentUser?._id);
  const timeAgo = (date) => {
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.floor(s/60)}m`;
    if (s < 86400) return `${Math.floor(s/3600)}h`;
    return `${Math.floor(s/86400)}d`;
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await onComment(post._id, commentText);
    setCommentText('');
    setShowComment(false);
  };

  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {post.user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 text-sm">{post.user?.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">{timeAgo(post.createdAt)}</span>
              {post.user?._id === currentUser?._id && (
                <button onClick={() => onDelete(post._id)} className="text-muted hover:text-red-500 transition-colors text-xs">✕</button>
              )}
            </div>
          </div>
          {post.type === 'health' && (
            <span className="badge bg-green-100 text-green-700 text-xs">🏃 Health Update</span>
          )}
        </div>
      </div>

      {post.content && <p className="text-gray-800 text-sm leading-relaxed mb-3">{post.content}</p>}

      {post.image && (
        <div className="mb-3 rounded-xl overflow-hidden">
          <img src={post.image} alt="post" className="w-full object-cover max-h-80" />
        </div>
      )}

      {post.healthData && (
        <div className="bg-green-50 rounded-xl p-3 mb-3 flex gap-4">
          {post.healthData.steps && <div className="text-center"><p className="text-xl font-bold text-green-700">{post.healthData.steps?.toLocaleString()}</p><p className="text-xs text-muted">Steps</p></div>}
          {post.healthData.workout && <div className="text-center"><p className="text-xl font-bold text-green-700">{post.healthData.workout}</p><p className="text-xs text-muted">Workout</p></div>}
          {post.healthData.streak && <div className="text-center"><p className="text-xl font-bold text-green-700">{post.healthData.streak}</p><p className="text-xs text-muted">Day Streak</p></div>}
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <button onClick={() => onLike(post._id)}
          className={`flex items-center gap-1.5 text-sm font-medium transition-all ${isLiked ? 'text-red-500' : 'text-muted hover:text-red-400'}`}>
          <span>{isLiked ? '❤️' : '🤍'}</span> {post.likes?.length || 0}
        </button>
        <button onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-700 font-medium transition-all">
          <span>💬</span> {post.comments?.length || 0}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-700 font-medium transition-all ml-auto">
          <span>↗</span> Share
        </button>
        <button onClick={() => setShowComment(!showComment)}
          className="btn-ghost text-xs py-1 px-3">Comment</button>
      </div>

      {showComments && post.comments?.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {post.comments.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                {c.user?.name?.charAt(0)}
              </div>
              <div className="bg-surface rounded-lg px-3 py-1.5 flex-1">
                <span className="text-xs font-semibold text-gray-700">{c.user?.name}: </span>
                <span className="text-xs text-muted">{c.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showComment && (
        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <input className="input text-sm py-2 flex-1" placeholder="Write a comment..." value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleComment()} />
          <button onClick={handleComment} className="btn-primary py-2 px-4 text-sm">Post</button>
        </div>
      )}
    </div>
  );
}

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', type: 'text', image: '', healthData: {} });
  const [postType, setPostType] = useState('text');
  const [healthInput, setHealthInput] = useState({ steps: '', workout: '', streak: '' });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await postService.getPosts();
      setPosts(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newPost.content.trim() && postType !== 'health') return;
    setPosting(true);
    try {
      const payload = { ...newPost, type: postType };
      if (postType === 'health') {
        payload.healthData = {
          steps: parseInt(healthInput.steps) || undefined,
          workout: healthInput.workout || undefined,
          streak: parseInt(healthInput.streak) || undefined,
        };
      }
      const { data } = await postService.createPost(payload);
      setPosts([data.data, ...posts]);
      setNewPost({ content: '', type: 'text', image: '', healthData: {} });
      setHealthInput({ steps: '', workout: '', streak: '' });
    } catch (e) { console.error(e); }
    finally { setPosting(false); }
  };

  const handleLike = async (id) => {
    try {
      await postService.likePost(id);
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const handleComment = async (id, text) => {
    try {
      await postService.commentPost(id, text);
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter(p => p._id !== id));
    } catch (e) { console.error(e); }
  };

  const postTypes = [
    { key: 'text', label: '📝 Text' },
    { key: 'tweet', label: '🐦 Quick Post' },
    { key: 'image', label: '🖼️ Image' },
    { key: 'health', label: '🏃 Health Update' },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Health Feed</h1>
        <p className="text-muted text-sm">Share your wellness journey with the community</p>
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <p className="text-sm text-muted font-medium">What's on your mind, {user?.name?.split(' ')[0]}?</p>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {postTypes.map(pt => (
            <button key={pt.key} onClick={() => setPostType(pt.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${postType === pt.key ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-border'}`}>
              {pt.label}
            </button>
          ))}
        </div>

        <textarea
          className="input resize-none mb-3 text-sm"
          placeholder={postType === 'health' ? 'Share your health achievement...' : 'Write something inspiring...'}
          rows={3}
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />

        {postType === 'image' && (
          <input className="input mb-3 text-sm" placeholder="Image URL" value={newPost.image}
            onChange={e => setNewPost({ ...newPost, image: e.target.value })} />
        )}

        {postType === 'health' && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            <input className="input text-sm" placeholder="Steps" type="number" value={healthInput.steps}
              onChange={e => setHealthInput({ ...healthInput, steps: e.target.value })} />
            <input className="input text-sm" placeholder="Workout" value={healthInput.workout}
              onChange={e => setHealthInput({ ...healthInput, workout: e.target.value })} />
            <input className="input text-sm" placeholder="Day Streak" type="number" value={healthInput.streak}
              onChange={e => setHealthInput({ ...healthInput, streak: e.target.value })} />
          </div>
        )}

        <div className="flex justify-end">
          <button onClick={handleCreate} disabled={posting}
            className="btn-primary px-6 disabled:opacity-60">
            {posting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted">Loading feed...</div>
      ) : posts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-semibold text-gray-900">No posts yet</p>
          <p className="text-muted text-sm mt-1">Be the first to share your health journey!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post._id} post={post} currentUser={user}
              onLike={handleLike} onComment={handleComment} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}