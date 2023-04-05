interface iPresentation {
  presentationId: string;
  title: string;
  subtitle: string;
  thumbnail: {
    contentUrl: string;
    height: number;
    width: number;
  };
}

export default iPresentation;
