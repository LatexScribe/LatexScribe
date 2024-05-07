package org.latexscribe.LatexScribe.webcontroller;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.DocumentDto;
import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.service.IDocumentService;
import org.latexscribe.LatexScribe.service.ITagService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/v1/documents")
public class DocumentController {
    final private IDocumentService documentService;
    final private ITagService tagService;

    @GetMapping
    public List<Document> searchByName(@RequestParam String name) {
        return documentService.findByName(name);
    }

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
    public HttpStatus createDocument(@RequestBody DocumentDto documentDto) {
        documentService.save(documentDto);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}")
    public HttpStatus putDocument(@PathVariable("id") Long id) {
        documentService.deleteById(id);
        return HttpStatus.OK;
    }

    @GetMapping("/tags/{name}")
    public List<Document> getByTagName(@PathVariable("name") String name) {
        Optional<DocumentTag> tag = tagService.findByName(name);
        if (tag.isEmpty()) {
            return Collections.emptyList();
        }
        return documentService.findByTag(tag.get());
    }
}