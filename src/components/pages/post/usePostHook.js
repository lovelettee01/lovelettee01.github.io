import { PostContext } from 'context/Context';
import { useContext } from 'react';

const usePostHook = post => {
  const {
    postsState: { cartItems },
    postsDispatch,
    isInShoppingCart,
    isInFavouriteItems
  } = useContext(PostContext);

  const handleAddToCart = (quantity, showModal, add) => {
    if (isInShoppingCart(post.id)) {
      const cartPost = cartItems.find(item => item.id === post.id);
      postsDispatch({
        type: 'UPDATE_CART_ITEM',
        payload: {
          post: {
            ...cartPost,
            quantity: add ? cartPost.quantity + quantity : quantity,
            totalPrice: quantity * post.price
          },
          showModal,
          quantity
        }
      });
    } else {
      postsDispatch({
        type: 'ADD_TO_CART',
        payload: {
          post: {
            ...post,
            quantity,
            totalPrice: quantity * post.price
          }
        }
      });
    }
  };

  const handleFavouriteClick = () => {
    postsDispatch({
      type: isInFavouriteItems(post.id)
        ? 'REMOVE_FROM_FAVOURITES'
        : 'ADD_TO_FAVOURITES',
      payload: { post }
    });
  };
  return { handleAddToCart, handleFavouriteClick };
};

export default usePostHook;
