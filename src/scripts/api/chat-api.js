
import {apiService} from "../instance/axiosBaseQuery";

export const chatService = apiService
    .injectEndpoints({
        overrideExisting: true,
        endpoints: (build) => ({

            friends: build.mutation({
                query: (data) => ({ method: 'GET', url: `chat/friend_list`,data:data }),
            }),
            getUser: build.query({
                query: (id) => ({ method: 'GET', url: `user/${id}` }),
            }),
            sendInvitation: build.mutation({
                query: (data) => ({
                    method: 'POST',
                    url:  `chat/invite`,
                    data: data,
                })}),
            sendMessage: build.mutation({
                query: (query) => {
                    console.log('Query:', query);
                    return {
                        method: 'POST',
                        url: '/query_pdf',
                        data:query,
                    };
                },
            }),
            acceptInvitation: build.query({
                query: (token) => ({ method: 'GET', url: `chat/accept-invitation?token=${token}` }),
            }),

        })})

export const {
    useFriendsQuery,
    useAcceptInvitationQuery,
    useGetUserQuery,
    useSendMessageMutation,
    useFriendsMutation,
    useSendInvitationMutation
} = chatService;
