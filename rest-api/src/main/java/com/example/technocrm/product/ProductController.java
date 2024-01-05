package com.example.technocrm.product;

import com.example.technocrm.product.entity.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestParam("name") String name,
                                                 @RequestParam("images") MultipartFile[] images) {
        try {
            List<String> imageUrls = new ArrayList<>();

            // Handle each uploaded image file
            for (MultipartFile image : images) {
                // Save the file to a location, e.g., an "uploads" directory
                String fileUrl = saveFile(image);

                // Store the file URL in the list
                imageUrls.add(fileUrl);
            }

            // Create a new product entity and set its properties
            Product product = new Product();
            product.setName(name);
            product.setImages(imageUrls);

            // Save the product to the database
            Product savedProduct = productRepository.save(product);

            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            // Handle file upload exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        // Retrieve all products from the database
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        // Retrieve a product by its ID
        Optional<Product> optionalProduct = productRepository.findById(id);

        return optionalProduct.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("images") MultipartFile[] images) {
        // Retrieve the existing product by ID
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            try {
                Product product = optionalProduct.get();
                product.setName(name);

                List<String> imageUrls = new ArrayList<>();

                // Handle each uploaded image file
                for (MultipartFile image : images) {
                    // Save the file to a location, e.g., an "uploads" directory
                    String fileUrl = saveFile(image);

                    // Store the file URL in the list
                    imageUrls.add(fileUrl);
                }

                // Update the product's image URLs
                product.setImages(imageUrls);

                // Save the updated product to the database
                Product updatedProduct = productRepository.save(product);

                return ResponseEntity.ok(updatedProduct);
            } catch (IOException e) {
                // Handle file upload exception
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        // Delete a product by its ID
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Helper method to save the uploaded file to a location
    private String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String filePath = "/path/to/uploads/" + fileName;

        File dest = new File(filePath);
        file.transferTo(dest);

        return fileName;
    }
}
