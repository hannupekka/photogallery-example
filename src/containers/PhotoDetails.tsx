import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash-es';
import * as styles from '~/styles/containers/PhotoDetails.scss';
import GalleryStore from '~/stores/GalleryStore';

interface Props {
  galleryStore: GalleryStore;
  match: {
    params: {
      photoId: string;
    };
  };
}

interface State {}

@inject('galleryStore')
@observer
export default class PhotoDetails extends React.Component<Props, State> {
  componentDidMount = () => {
    const { galleryStore } = this.props;
    const { photos } = galleryStore;

    if (photos.length === 0) {
      galleryStore.fetchPhotos();
    }
  };

  renderPhoto = () => {
    const {
      galleryStore,
      match: {
        params: { photoId },
      },
    } = this.props;

    const { photos } = galleryStore;

    const photo = _.find(photos, p => p.id === parseInt(photoId, 10));
    if (!photo) {
      return null;
    }

    return (
      <div>
        <img src={photo.url} />
        <p>{photo.title}</p>
      </div>
    );
  };

  render() {
    return <div className={styles.wrapper}>{this.renderPhoto()}</div>;
  }
}
