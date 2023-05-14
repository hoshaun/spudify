import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import PlaylistItem from "components/PlaylistItem";
import Playlist from "components/Playlist";
import Track from "components/Track/index.js";
import Header from "components/Track/Header";
import Empty from "components/Track/Empty";
import Show from "components/Track/Show";
import Confirm from "components/Track/Confirm";
import Status from "components/Track/Status";
import Error from "components/Track/Error";
import Form from "components/Track/Form";

// Button Stories
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// PlaylistItem Stories
storiesOf("PlaylistItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <PlaylistItem name={"Playlist 1"} />)
  .add("Selected", () => <PlaylistItem name={"Playlist 1"} selected />) 
  .add("Full", () => <PlaylistItem name={"Playlist 1"} />)
  .add("Clickable", () => (
    <PlaylistItem name={"Playlist 2"} setPlaylist={action("setPlaylist")} />
  ));


// Playlist Stories
const playlists = [
  {
    id: 1,
    name: "Playlist 1"
  },
  {
    id: 2,
    name: "Playlist 2"
  },
  {
    id: 3,
    name: "Playlist 3"
  },
];

storiesOf("Playlist", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Playlist 1", () => (
    <Playlist playlists={playlists} value={"Playlist 1"} onChange={action("setPlaylist")} />
  ))
  .add("Playlist 2", () => (
    <Playlist playlists={playlists} value={"Playlist 2"} onChange={action("setPlaylist")} />
  ))
  .add("Playlist 3", () => (
    <Playlist playlists={playlists} value={"Playlist 3"} onChange={action("setPlaylist")} />
  ));

// Track Stories
storiesOf("Track", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Track", () => <Track />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show 
      title={"TrackName"} 
      artist={"ArtistName"} 
      onEdit={action("onEdit")} 
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message={"Delete the track?"}
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Status", () => <Status message={"Deleting"} />)
  .add("Error", () => (
    <Error 
      message={"Could not delete track."} 
      onClose={action("onClose")} />
  ))
  .add("Create", () => (
    <Form
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Edit", () => (
    <Form
      title={"TrackName"}
      artist={"ArtistName"}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Track Empty", () => (
    <Fragment>
      <Track id={1} />
      <Track />
    </Fragment>
  ))
  .add("Track Added", () => (
    <Fragment>
      <Track
        id={1}
        track={{ title: "TrackName", artist: "ArtistName" }}
      />
      <Track />
    </Fragment>
  ));