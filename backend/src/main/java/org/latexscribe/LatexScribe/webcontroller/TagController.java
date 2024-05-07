package org.latexscribe.LatexScribe.webcontroller;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.service.ITagService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
public class TagController {
    private final ITagService tagService;

    @GetMapping
    public List<DocumentTag> listAll() {
        return tagService.listAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody DocumentTag getById(@PathVariable("id") Long id) {
        Optional<DocumentTag> tag = tagService.findById(id);
        if (tag.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "document tag not found"
            );
        }
        return tag.get();
    }
}
