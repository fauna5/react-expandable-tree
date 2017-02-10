# react-expandable-tree

Displays an expandable tree based on some JSON that you provide. 

![expandable tree gif](https://raw.githubusercontent.com/fauna5/react-expandable-tree/master/react-expandable-tree.gif)

It expects the data to arrive asynchronously. i.e. it has an initial loading spinner and expects you to push the data in once your XHR has completed. 

All the group hierarchy and clients are loaded together. User data is loaded when the client expands.

## Usage

```jsx
import Tree from 'react-expandable-tree'

function onGroupSelected(itemId) {
	console.log(itemId, 'was clicked')
}

function onClientSelected(itemId) {
    console.log(itemId, 'was clicked')
    setTimeout(() => { // Fake XHR
        component.onUserDataLoaded(userData)
    }, 1000)
}

function onUserSelected(itemId) {
	console.log(itemId, 'was clicked')
}

const component = ReactDOM.render(
		<Tree onGroupSelected={onGroupSelected} onClientSelected={onClientSelected} onUserSelected={onUserSelected}/>,
		myDiv
	)

setTimeout(() => { // Fake XHR
	component.onDataLoaded(initialData)
}, 1000)

```

## Options

#### `onGroupSelected(itemId)`: PropTypes.func

Callback when a `group` is selected in the tree.

#### `onClientSelected(itemId)`: PropTypes.func

Callback when a `client` is selected in the tree. Typically used to initiate the call to load the user list for that client.

#### `onUserSelected(userId)`: PropTypes.func

Callback when a `user` is selected in the tree.

#### `data`: PropTypes.object

You can provide the data for `group`s and `client`s up front if you have it already. This will not render the spinner and put the tree on the screen on first render. This is useful for testing.

## Functions for pushing data into the tree

#### `Tree.onDataLoaded(data)`

Call this method to push in all `group` and `client` data

#### `Tree.onUserDataLoaded(data)`

Call this method to push in all `user` data

## Data examples

#### Groups and Clients

```jsx
{
  groups: [
    {
        id: 1,
        name: 'Japan',
        groups: [
            {
                id: 2,
                name: 'Automotive',
                clients: [
                    {
                        id: 3,
                        name: 'Mitsubishi'
                    },
                    {
                        id: 4,
                        name: 'Nissan'
                    },
                    {
                        id: 5,
                        name: 'Toyota'
                    }
                ]
            }
        ]
    }
  ]
}                       
```

#### Users