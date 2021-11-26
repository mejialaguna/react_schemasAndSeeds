import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import CarouselImg from "../CarouselImg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import img1 from "../../img/img-1.jpg";
import img2 from "../../img/img-2.jpg";
import img3 from "../../img/img-3.jpg";
import img4 from "../../img/img-4.jpg";
import img5 from "../../img/img5.jpg";
import img6 from "../../img/img6.jpg";
import img7 from "../../img/img7.jpg";
import ProductContext from "../../utils/productContext";
import { Container, Card, CardColumns } from "react-bootstrap";

const display = {
  img: {
    height: 600,
  },
  centerImg: {
    marginTop: 100,
    justifyContent: "center",
    marginBottom: 100,
  },
  border: {
    border: "3px black solid",
    marginBottom: 16,
  },
  border1: {
    border: "3px black solid",
  },
};

const Main = () => {
  const products = useContext(ProductContext);
  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={display.img}
            />
            <Carousel.Caption>
              <h3>NEW LOOKS</h3>
              <p>It is coming, Embrace the change</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={display.img}
            />

            <Carousel.Caption>
              <h3>Better than before</h3>
              <p>Get ready to feel Sexy</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img4}
              alt="Third slide"
              style={display.img}
            />

            <Carousel.Caption>
              <h3>Jungle</h3>
              <p>Be happy and blend with nature</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {!products.length ? (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={display.centerImg}>
              <Grid item xs={6} md={5}>
                <img style={display.border1} src={img5}></img>
              </Grid>
              <Grid item xs={6} md={3}>
                <img src={img6} style={display.border}></img>
                <img src={img7} style={display.border}></img>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <Container>
          <h2>
            {products.length
              ? `Viewing ${products.length} results:`
              : null}
          </h2>
          <CardColumns>
            {products.map((item) => {
              return (
                <Card key={item.productId} border="dark">
                  {item.images ? (
                    <Card.Img
                      src={item.images}
                      alt={`The cover for ${item.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {/* <p className="small"> {item.name}</p> */}
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Footer> ${item.price} </Card.Footer>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      )}

      <div>
        <CarouselImg />
      </div>
    </div>
  );
};

export default Main;
