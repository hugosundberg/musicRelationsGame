interface ArtistProps {
  name: string;
  img: string;
}

const Artist = ({ name, img }: ArtistProps) => {
  return (
    <>
      <div>
        <h2>Artist: {name}</h2>
        {img && (
          <div>
            <img src={img} alt={name} style={{ width: "200px" }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Artist;
