/* eslint-disable no-plusplus */
// NOTE: replace 'NhPa6JxauSV4GCPVRcsAlCMs1w42' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: '4EAS2HLhzHbwsZpx0vovzE47Tk43',
      username: 'tizzle',
      fullName: 'Tizhe Paul',
      emailAddress: 'tizhepaul@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'john',
      fullName: 'John Okewu',
      emailAddress: 'okewujohn@gmail.com',
      following: [],
      followers: ['4EAS2HLhzHbwsZpx0vovzE47Tk43'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'sely',
      fullName: 'Selpon Zwandor',
      emailAddress: 'zwandorselpon01@gmail.com',
      following: [],
      followers: ['4EAS2HLhzHbwsZpx0vovzE47Tk43'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'gospel',
      fullName: 'Gospel Bongtur',
      emailAddress: 'gospelbongtur24@gmail.com',
      following: [],
      followers: ['4EAS2HLhzHbwsZpx0vovzE47Tk43'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Tizhe and Friends',
        likes: [],
        comments: [
          {
            displayName: 'gopy',
            comment: 'Love Nigeria ! we should visit yankari game reserve '
          },
          {
            displayName: 'Selly',
            comment: 'This picture is dope can i use it'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}


// 4EAS2HLhzHbwsZpx0vovzE47Tk43
