const chats = {
  heading: `Messages`,
  lastMessage: ({ hasLastMessage, lastMessage, isAuthor, isInvite, mimeType }) =>
    hasLastMessage
      ? mimeType === 'audio'
        ? lastMessage
          ? lastMessage
          : '🎵 Audio'
        : mimeType === 'image'
        ? lastMessage
          ? lastMessage
          : '📷 Image'
        : mimeType === 'video'
        ? lastMessage
          ? lastMessage
          : '🎥 Video'
        : mimeType === 'application'
        ? lastMessage
          ? lastMessage
          : '📄 Pdf'
        : lastMessage
      : isAuthor
      ? 'You created this group'
      : isInvite
      ? `You've been inivited to this group`
      : 'You just joined this group',
  more: `More`,
  archive: `Archive`,
  noUser: `Log in to view your messages`,
  invite: {
    heading: `You have been invited to this group`,
    accept: `Accept`,
    decline: `Decline`
  },
  createGroup: {
    headerTitle: `Create A Group`,
    heading: `Give your group a name and\ncustomise it`,
    upload: {
      deletePhoto: {
        title: 'Delete Photo'
      },
      viewPhoto: {
        title: 'View Photo'
      },
      takePhoto: {
        title: 'Take Photo'
      },
      choosePhoto: {
        title: 'Choose Photo'
      },
      photo: {
        title: 'Photo & Video Library'
      },
      camera: {
        title: 'Camera'
      },
      document: {
        title: 'Document'
      },
      cancel: `Cancel`
    },
    name: {
      placeholder: `Name your group, e.g City Explorers`
    },
    groupAccess: {
      heading: `Group Access`,
      public: {
        title: `Anyone can join`,
        text: `Share invitation links and require no approval.`
      },
      private: {
        title: `Approval required`,
        text: `Members must be approved before joining.`
      }
    },
    create: `Create`
  },
  split: {
    heading: `Split expenses with friends and family`
  },
  nodata: {
    heading: `Create a group chat with your friends`,
    message: `You have no active groups yet.\nTo create one, start a group chat and invite your friends to split bills and plan hangouts in groups.`,
    btnText: `Create a Group Chat`
  },
  chatRoom: {
    nodata: {
      heading: `Welcome to`,
      subheading: `You can chat, share fun activities and keep track of all group expenses in one place.`,
      invite: {
        heading: `Let’s have some fun`,
        subheading: `Invite your people to start your next adventure`
      }
    },
    invite: {
      heading: 'Invite people to your group',
      subheading: 'Share this link with your friends to let them join this group.',
      share: {
        title: `Expitra`,
        text: `Click this link to become a member of my chat group on Expitra.`,
        btn: `Share Link`
      },
      dismiss: `Dismiss`
    }
  }
};
export default chats;
