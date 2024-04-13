package org.latexscribe.LatexScribe.webcontroller;

import lombok.AllArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.DocumentDto;
import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.service.IDocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/documents")
@AllArgsConstructor
public class DocumentController {
    final private IDocumentService documentService;

    @GetMapping("/{id}")
    public @ResponseBody Document getById(@PathVariable("id") Long id) {
        Optional<Document> document = documentService.findById(id);
        if (document.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "document not found"
            );
        }
        return document.get();
    }

    @PostMapping
    public HttpStatus putDocument(@RequestBody DocumentDto documentDto) {
        documentService.save(documentDto);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}")
    public HttpStatus putDocument(@PathVariable("id") Long id) {
        documentService.deleteById(id);
        return HttpStatus.OK;
    }
}
